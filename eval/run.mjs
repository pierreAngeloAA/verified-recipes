// Compares an agent with and without the recipes on the same tasks. The agent
// can only write the solution, not run it, so the score shows whether the first
// answer is correct. Results are saved under eval/results/.
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const tasksDir = join(here, 'tasks');
const tasks = readdirSync(tasksDir).sort();

const CHECK_ENV = {
  ...process.env,
  BUNDLE_GEMFILE: join(root, 'recipes/rails/Gemfile'),
  BUNDLE_PATH: join(root, '.cache/bundle'),
  RECIPE_SUPPORT: join(root, 'recipes/rails/support.rb'),
};
const WITH_RECIPES_PROMPT =
  'A verified-recipes MCP server is available. Search it before writing framework code.';

function runCheck(task, solutionPath) {
  const result = spawnSync('bundle', ['exec', 'ruby', join(tasksDir, task, 'check.rb')], {
    env: { ...CHECK_ENV, SOLUTION: solutionPath },
    encoding: 'utf8',
    timeout: 60_000,
  });
  return { passed: result.status === 0, output: `${result.stdout}${result.stderr}` };
}

function selfCheck() {
  let ok = true;
  for (const task of tasks) {
    const good = runCheck(task, join(tasksDir, task, 'good.rb')).passed;
    const bad = runCheck(task, join(tasksDir, task, 'bad.rb')).passed;
    const valid = good && !bad;
    ok &&= valid;
    console.log(`${valid ? 'OK  ' : 'BAD '} ${task} (good passes: ${good}, mistake passes: ${bad})`);
  }
  process.exit(ok ? 0 : 1);
}

function runAgent({ task, mode, model, maxBudget }) {
  const dir = mkdtempSync(join(tmpdir(), 'verified-recipes-eval-'));
  const args = [
    '-p', readFileSync(join(tasksDir, task, 'prompt.txt'), 'utf8'),
    '--model', model,
    '--max-budget-usd', String(maxBudget),
    '--output-format', 'stream-json',
    '--verbose',
    '--strict-mcp-config',
    '--disable-slash-commands',
    '--disallowedTools', 'Bash,Edit,Glob,Grep,Read,NotebookEdit,WebFetch,WebSearch,Task,Agent',
  ];
  const allowed = ['Write'];

  if (mode === 'with') {
    const configPath = join(dir, 'mcp.json');
    writeFileSync(configPath, JSON.stringify({
      mcpServers: {
        'verified-recipes': {
          command: process.execPath,
          args: [join(root, 'mcp/server.mjs')],
          env: { VERIFIED_RECIPES_INDEX_URL: 'off' },
        },
      },
    }));
    args.push('--mcp-config', configPath, '--append-system-prompt', WITH_RECIPES_PROMPT);
    allowed.push('mcp__verified-recipes__search_recipes', 'mcp__verified-recipes__get_recipe');
  }
  args.push('--allowedTools', allowed.join(','));

  return new Promise((resolve) => {
    const child = spawn('claude', args, { cwd: dir, stdio: ['ignore', 'pipe', 'ignore'] });
    let stdout = '';
    const timer = setTimeout(() => child.kill('SIGKILL'), 240_000);
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.on('close', () => {
      clearTimeout(timer);
      const events = stdout.trim().split('\n').flatMap((line) => {
        try { return [JSON.parse(line)]; } catch { return []; }
      });
      const calls = events
        .filter((event) => event.type === 'assistant')
        .flatMap((event) => event.message.content)
        .filter((block) => block.type === 'tool_use')
        .map((block) => block.name);
      const summary = events.find((event) => event.type === 'result');
      const solutionPath = join(dir, 'solution.rb');
      const wrote = existsSync(solutionPath);
      const check = wrote ? runCheck(task, solutionPath) : { passed: false, output: 'no solution.rb' };

      resolve({
        task,
        mode,
        model,
        passed: check.passed,
        used_recipes: calls.some((name) => name.startsWith('mcp__verified-recipes__')),
        tool_calls: calls.length,
        cost_usd: summary?.total_cost_usd ?? null,
        duration_ms: summary?.duration_ms ?? null,
        solution: wrote ? readFileSync(solutionPath, 'utf8') : null,
        check_output: check.passed ? '' : check.output.slice(-1500),
      });
      rmSync(dir, { recursive: true, force: true });
    });
  });
}

async function pool(jobs, size) {
  const results = [];
  let next = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    while (next < jobs.length) {
      const job = jobs[next++];
      const result = await job();
      results.push(result);
      console.log(`${result.passed ? 'PASS' : 'FAIL'} ${result.mode.padEnd(7)} ${result.task} recipes=${result.used_recipes} calls=${result.tool_calls}`);
    }
  }));
  return results;
}

function summarize(results) {
  const rows = [...new Set(results.map((r) => r.task))].sort().map((task) => {
    const cell = (mode) => {
      const runs = results.filter((r) => r.task === task && r.mode === mode);
      return `${runs.filter((r) => r.passed).length}/${runs.length}`;
    };
    return `| ${task} | ${cell('without')} | ${cell('with')} |`;
  });
  const total = (mode) => {
    const runs = results.filter((r) => r.mode === mode);
    const costs = runs.map((r) => r.cost_usd ?? 0);
    const seconds = runs.map((r) => (r.duration_ms ?? 0) / 1000);
    const average = (values) => values.reduce((a, b) => a + b, 0) / (values.length || 1);
    return {
      passed: `${runs.filter((r) => r.passed).length}/${runs.length}`,
      cost: average(costs).toFixed(4),
      seconds: average(seconds).toFixed(1),
      calls: average(runs.map((r) => r.tool_calls)).toFixed(1),
    };
  };
  const without = total('without');
  const withRecipes = total('with');
  return [
    '| Task | Without recipes | With recipes |',
    '|---|---|---|',
    ...rows,
    `| **Total passed** | **${without.passed}** | **${withRecipes.passed}** |`,
    `| Average cost (USD) | ${without.cost} | ${withRecipes.cost} |`,
    `| Average time (s) | ${without.seconds} | ${withRecipes.seconds} |`,
    `| Average tool calls | ${without.calls} | ${withRecipes.calls} |`,
  ].join('\n');
}

async function main() {
  const { values } = parseArgs({
    options: {
      'self-check': { type: 'boolean', default: false },
      model: { type: 'string', default: 'haiku' },
      runs: { type: 'string', default: '3' },
      concurrency: { type: 'string', default: '4' },
      'max-budget': { type: 'string', default: '0.25' },
    },
  });
  if (values['self-check']) selfCheck();

  const jobs = [];
  for (const task of tasks) {
    for (let run = 0; run < Number(values.runs); run += 1) {
      for (const mode of ['without', 'with']) {
        jobs.push(() => runAgent({ task, mode, model: values.model, maxBudget: values['max-budget'] }));
      }
    }
  }

  const results = await pool(jobs, Number(values.concurrency));
  const resultsDir = join(here, 'results');
  mkdirSync(resultsDir, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 10);
  const name = `${stamp}-${values.model}`;
  writeFileSync(join(resultsDir, `${name}.json`), `${JSON.stringify(results, null, 2)}\n`);
  const table = summarize(results);
  writeFileSync(join(resultsDir, `${name}.md`), `# Evaluation ${name}\n\n${table}\n`);
  console.log(`\n${table}`);
}

await main();

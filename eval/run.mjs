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
const { values: options } = parseArgs({
  options: {
    'self-check': { type: 'boolean', default: false },
    model: { type: 'string', default: 'haiku' },
    runs: { type: 'string', default: '3' },
    concurrency: { type: 'string', default: '4' },
    'max-budget': { type: 'string', default: '0.25' },
    filter: { type: 'string', default: '' },
    unprompted: { type: 'boolean', default: false },
    'max-total': { type: 'string', default: '0.20' },
  },
});
const tasks = readdirSync(tasksDir).filter((task) => task.startsWith(options.filter)).sort();

const CHECK_ENV = {
  ...process.env,
  BUNDLE_GEMFILE: join(root, 'recipes/rails/Gemfile'),
  BUNDLE_PATH: join(root, '.cache/bundle'),
  RECIPE_SUPPORT: join(root, 'recipes/rails/support.rb'),
};
const WITH_RECIPES_PROMPT =
  'A verified-recipes MCP server is available. Search it before writing framework code.';

function taskMeta(task) {
  const path = join(tasksDir, task, 'meta.json');
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : { solution: 'solution.rb', profile: '' };
}

function runCheck(task, solutionPath) {
  const meta = taskMeta(task);
  const isRails = meta.solution.endsWith('.rb');
  const [command, args] = isRails
    ? ['bundle', ['exec', 'ruby', join(tasksDir, task, 'check.rb')]]
    : ['bash', [join(here, 'spring-check.sh'), join(tasksDir, task), solutionPath, meta.solution, meta.profile]];
  const result = spawnSync(command, args, {
    env: { ...CHECK_ENV, SOLUTION: solutionPath },
    encoding: 'utf8',
    timeout: 180_000,
    maxBuffer: 64 * 1024 * 1024,
  });
  return { passed: result.status === 0, output: `${result.stdout}${result.stderr}` };
}

function fixture(task, name) {
  const extension = taskMeta(task).solution.split('.').at(-1);
  return join(tasksDir, task, `${name}.${extension}`);
}

function selfCheck() {
  let ok = true;
  for (const task of tasks) {
    const good = runCheck(task, fixture(task, 'good')).passed;
    const bad = runCheck(task, fixture(task, 'bad')).passed;
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

  if (mode !== 'without') {
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
    args.push('--mcp-config', configPath);
    // Unprompted runs only connect the tools, to show whether agents choose to use them.
    if (mode === 'with') args.push('--append-system-prompt', WITH_RECIPES_PROMPT);
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
      const solutionPath = join(dir, taskMeta(task).solution);
      const wrote = existsSync(solutionPath);
      const check = wrote ? runCheck(task, solutionPath) : { passed: false, output: 'no solution file' };

      resolve({
        task,
        mode,
        model,
        passed: check.passed,
        used_recipes: calls.some((name) => name.startsWith('mcp__verified-recipes__')),
        using_overage: /"isUsingOverage"\s*:\s*true/.test(stdout),
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

// Stops starting runs at the spending cap, or as soon as a run reports paid extra usage.
async function pool(jobs, size, maxTotal) {
  const results = [];
  let next = 0;
  let total = 0;
  let stopped = false;
  await Promise.all(Array.from({ length: size }, async () => {
    while (next < jobs.length && !stopped) {
      const job = jobs[next++];
      const result = await job();
      results.push(result);
      total += result.cost_usd ?? 0;
      if (result.using_overage || total >= maxTotal) {
        stopped = true;
        console.log(`STOPPED: ${result.using_overage ? 'paid extra usage detected' : `reached $${maxTotal}`}`);
      }
      console.log(`${result.passed ? 'PASS' : 'FAIL'} ${result.mode.padEnd(10)} ${result.task} recipes=${result.used_recipes} calls=${result.tool_calls}`);
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

function summarizeUnprompted(results) {
  const rows = [...new Set(results.map((r) => r.task))].sort().map((task) => {
    const runs = results.filter((r) => r.task === task);
    return `| ${task} | ${runs.filter((r) => r.used_recipes).length}/${runs.length} | ${runs.filter((r) => r.passed).length}/${runs.length} |`;
  });
  const consulted = results.filter((r) => r.used_recipes);
  const skipped = results.filter((r) => !r.used_recipes);
  const passed = (runs) => `${runs.filter((r) => r.passed).length}/${runs.length}`;
  return [
    '| Task | Used the recipes without being told | Passed |',
    '|---|---|---|',
    ...rows,
    `| **Total** | **${consulted.length}/${results.length}** | **${passed(results)}** |`,
    '',
    `Passed when the recipes were used: ${passed(consulted)}. Passed when they were not: ${passed(skipped)}.`,
    `Total cost reported: $${results.reduce((sum, r) => sum + (r.cost_usd ?? 0), 0).toFixed(3)}.`,
  ].join('\n');
}

async function main() {
  const values = options;
  if (values['self-check']) selfCheck();

  const jobs = [];
  for (const task of tasks) {
    for (let run = 0; run < Number(values.runs); run += 1) {
      for (const mode of values.unprompted ? ['unprompted'] : ['without', 'with']) {
        jobs.push(() => runAgent({ task, mode, model: values.model, maxBudget: values['max-budget'] }));
      }
    }
  }

  const results = await pool(jobs, Number(values.concurrency), Number(values['max-total']));
  const resultsDir = join(here, 'results');
  mkdirSync(resultsDir, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 10);
  const name = [stamp, values.model, values.filter.replace(/-$/, ''), values.unprompted && 'unprompted'].filter(Boolean).join('-');
  writeFileSync(join(resultsDir, `${name}.json`), `${JSON.stringify(results, null, 2)}\n`);
  const table = values.unprompted ? summarizeUnprompted(results) : summarize(results);
  writeFileSync(join(resultsDir, `${name}.md`), `# Evaluation ${name}\n\n${table}\n`);
  console.log(`\n${table}`);
}

await main();

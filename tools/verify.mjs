import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { loadRecipes, VERIFY_FILES } from './lib/recipes.mjs';
import { failureReport, updateStatus } from './lib/status.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cache = join(root, '.cache');

const RAILS_ENV = {
  BUNDLE_GEMFILE: join(root, 'recipes/rails/Gemfile'),
  BUNDLE_PATH: join(cache, 'bundle'),
};

// Python stacks share one virtual environment; each installs its newest packages.
const VENV = join(cache, 'venv');
const PYTHON = join(VENV, 'bin/python');
const pythonStack = (stack) => ({
  env: { PYTHONPATH: join(root, 'recipes'), PYTHONDONTWRITEBYTECODE: '1' },
  setup: [
    'bash',
    ['-c', `{ [ -x "$1" ] || python3 -m venv "$2"; } && { [ ! -f "$3" ] || "$1" -m pip install -q -U -r "$3"; }`, '_', PYTHON, VENV,
      join(root, `recipes/${stack}/requirements.txt`)],
  ],
  command: (file) => [PYTHON, [file]],
});

const STACKS = {
  anthropic: pythonStack('anthropic'),
  langchain: pythonStack('langchain'),
  mcp: pythonStack('mcp'),
  openai: pythonStack('openai'),
  python: pythonStack('python'),
  go: {
    env: {},
    // Fails early with a clear message when Go is not installed.
    setup: ['go', ['version']],
    command: (file) => ['bash', [file]],
  },
  rails: {
    env: RAILS_ENV,
    // `update` ignores any existing lockfile, so each run gets the newest release.
    setup: ['bundle', ['update', '--quiet']],
    command: (file) => ['bundle', ['exec', 'ruby', file]],
  },
  react: {
    env: {},
    // No lockfile, so each run gets the newest release.
    setup: ['npm', ['install', '--no-package-lock', '--no-audit', '--no-fund', '--silent'], join(root, 'recipes/react')],
    command: (file) => [process.execPath, [file]],
  },
  typescript: {
    env: {},
    // No lockfile, so each run gets the newest release.
    setup: ['npm', ['install', '--no-package-lock', '--no-audit', '--no-fund', '--silent'], join(root, 'recipes/typescript')],
    command: (file) => [process.execPath, [file]],
  },
  node: {
    env: {},
    // Runs each recipe with the Node.js that runs this script (latest LTS in CI).
    setup: [process.execPath, ['--version']],
    command: (file) => [process.execPath, [file]],
  },
  spring: {
    env: {},
    setup: ['docker', ['pull', '--quiet', 'maven:3-eclipse-temurin-21']],
    command: (file) => ['bash', [file]],
  },
  swift: {
    env: {},
    setup: ['docker', ['pull', '--quiet', 'swift:latest']],
    command: (file) => ['bash', [file]],
  },
};

function run(command, args, env, cwd = root) {
  return spawnSync(command, args, {
    cwd,
    env: { ...process.env, ...env },
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
}

function parseVersions(output) {
  const line = output.match(/^VERSIONS (\{.*\})$/m);
  return line ? JSON.parse(line[1]) : null;
}

function verifyAll({ stack, id } = {}) {
  const selected = loadRecipes(root).filter(
    (recipe) => (!stack || recipe.stack === stack) && (!id || recipe.folderName === id),
  );
  const results = [];
  const failedSetups = new Map();

  for (const stackName of new Set(selected.map((recipe) => recipe.stack))) {
    const config = STACKS[stackName];
    if (!config?.setup) continue;
    const [command, args, cwd] = config.setup;
    const result = run(command, args, config.env, cwd);
    if (result.status !== 0) failedSetups.set(stackName, `${result.stdout}${result.stderr}`);
  }

  for (const recipe of selected) {
    const config = STACKS[recipe.stack];
    const name = recipe.folderName;
    if (!config) {
      results.push({ id: name, passed: false, versions: null, output: `no runner for stack "${recipe.stack}"` });
      continue;
    }
    if (failedSetups.has(recipe.stack)) {
      results.push({ id: name, passed: false, versions: null, output: failedSetups.get(recipe.stack) });
      continue;
    }

    const file = join(recipe.dir, VERIFY_FILES[recipe.stack]);
    const [command, args] = config.command(file, recipe);
    const result = run(command, args, config.env);
    const output = `${result.stdout ?? ''}${result.stderr ?? ''}${result.error?.message ?? ''}`;
    const versions = parseVersions(output);
    // A pass without reported versions would produce an unverifiable claim.
    results.push({ id: name, passed: result.status === 0 && versions !== null, versions, output });
  }
  return results;
}

function writeStatus(results, failuresFile) {
  const date = new Date().toISOString().slice(0, 10);
  const statusPath = join(root, 'verification/status.json');
  const previous = existsSync(statusPath) ? JSON.parse(readFileSync(statusPath, 'utf8')) : {};

  mkdirSync(dirname(statusPath), { recursive: true });
  writeFileSync(statusPath, `${JSON.stringify(updateStatus(previous, results, date), null, 2)}\n`);

  const report = failureReport(results, date);
  if (failuresFile && report) writeFileSync(failuresFile, report);
}

function main() {
  const { values } = parseArgs({
    options: {
      stack: { type: 'string' },
      id: { type: 'string' },
      write: { type: 'boolean', default: false },
      'failures-file': { type: 'string' },
    },
  });
  const results = verifyAll({ stack: values.stack, id: values.id });
  if (values.write) writeStatus(results, values['failures-file']);

  for (const result of results) {
    const versions = result.versions ? JSON.stringify(result.versions) : '';
    console.log(`${result.passed ? 'PASS' : 'FAIL'} ${result.id} ${versions}`);
    if (!result.passed) console.log(result.output);
  }

  const passed = results.filter((result) => result.passed).length;
  console.log(`${passed}/${results.length} recipes verified from ${relative(process.cwd(), root) || '.'}`);
  process.exit(results.length > 0 && passed === results.length ? 0 : 1);
}

main();

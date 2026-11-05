// Saves usage numbers that the sources only keep for a limited time.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { mergeHistory, renderReport } from './lib/metrics.mjs';

const REPO = 'pierreAngeloAA/verified-recipes';
const PACKAGE = 'verified-recipes';
const NPM_WINDOW_DAYS = 30;

const day = (date) => date.toISOString().slice(0, 10);
const token = process.env.METRICS_TOKEN || process.env.GITHUB_TOKEN;

async function github(path) {
  return fetch(`https://api.github.com/repos/${REPO}${path}`, {
    headers: {
      accept: 'application/vnd.github+json',
      'user-agent': 'verified-recipes-metrics',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    signal: AbortSignal.timeout(15_000),
  });
}

async function npmDays(today) {
  const start = new Date(today.getTime() - NPM_WINDOW_DAYS * 86_400_000);
  const response = await fetch(
    `https://api.npmjs.org/downloads/range/${day(start)}:${day(today)}/${PACKAGE}`,
    { signal: AbortSignal.timeout(15_000) },
  );
  if (response.status === 404) {
    console.log('npm: package not published yet');
    return {};
  }
  if (!response.ok) throw new Error(`npm responded with HTTP ${response.status}`);

  const { downloads } = await response.json();
  return Object.fromEntries(downloads.map(({ day: date, downloads: count }) => [date, { npm_downloads: count }]));
}

// Traffic data needs push access, which the default Actions token does not have.
async function trafficDays(path, listKey, countField, uniqueField) {
  const response = await github(path);
  if (response.status === 401 || response.status === 403) {
    console.log(`GitHub ${listKey}: skipped because the token has no access`);
    return {};
  }
  if (!response.ok) throw new Error(`GitHub ${listKey} responded with HTTP ${response.status}`);

  const body = await response.json();
  return Object.fromEntries(
    body[listKey].map(({ timestamp, count, uniques }) => [
      timestamp.slice(0, 10),
      { [countField]: count, [uniqueField]: uniques },
    ]),
  );
}

async function repositorySnapshot() {
  const response = await github('');
  if (!response.ok) throw new Error(`GitHub repository responded with HTTP ${response.status}`);
  const { stargazers_count: stars, forks_count: forks } = await response.json();
  return { stars, forks };
}

function combine(...sources) {
  const days = {};
  for (const source of sources) {
    for (const [date, values] of Object.entries(source)) days[date] = { ...days[date], ...values };
  }
  return days;
}

const { values } = parseArgs({ options: { dir: { type: 'string', default: 'metrics' } } });
const today = new Date();
const historyPath = join(values.dir, 'history.json');
const previous = existsSync(historyPath)
  ? JSON.parse(readFileSync(historyPath, 'utf8'))
  : { days: {}, snapshots: {} };

const [npm, views, clones, snapshot] = await Promise.all([
  npmDays(today),
  trafficDays('/traffic/views', 'views', 'github_views', 'github_visitors'),
  trafficDays('/traffic/clones', 'clones', 'github_clones', 'github_cloners'),
  repositorySnapshot(),
]);

const history = mergeHistory(previous, { days: combine(npm, views, clones), snapshot, date: day(today) });
const report = renderReport(history);

mkdirSync(values.dir, { recursive: true });
writeFileSync(historyPath, `${JSON.stringify(history, null, 2)}\n`);
writeFileSync(join(values.dir, 'README.md'), report);
console.log(report);

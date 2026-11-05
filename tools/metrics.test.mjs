import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mergeHistory, renderReport, totals } from './lib/metrics.mjs';

const EMPTY = { days: {}, snapshots: {} };

test('a later run corrects a day without losing other fields', () => {
  const first = mergeHistory(EMPTY, { days: { '2026-11-05': { npm_downloads: 1, github_clones: 2 } }, date: '2026-11-05' });
  const second = mergeHistory(first, { days: { '2026-11-05': { npm_downloads: 5 } }, date: '2026-11-06' });

  assert.deepEqual(second.days['2026-11-05'], { npm_downloads: 5, github_clones: 2 });
});

test('running twice does not double the totals', () => {
  const input = { days: { '2026-11-05': { npm_downloads: 3 } }, date: '2026-11-05' };
  const history = mergeHistory(mergeHistory(EMPTY, input), input);

  assert.equal(totals(history).npm_downloads, 3);
});

test('days older than the source window are kept', () => {
  const old = mergeHistory(EMPTY, { days: { '2026-01-01': { github_clones: 7 } }, date: '2026-01-01' });
  const next = mergeHistory(old, { days: { '2026-11-05': { github_clones: 1 } }, date: '2026-11-05' });

  assert.equal(totals(next).github_clones, 8);
});

test('the report groups by month and shows the total', () => {
  const history = mergeHistory(EMPTY, {
    days: {
      '2026-10-31': { npm_downloads: 1 },
      '2026-11-01': { npm_downloads: 2 },
      '2026-11-02': { npm_downloads: 3 },
    },
    snapshot: { stars: 4, forks: 1 },
    date: '2026-11-02',
  });
  const report = renderReport(history);

  assert.match(report, /\| 2026-11 \| 5 \| 0 \| 0 \|/);
  assert.match(report, /\| 2026-10 \| 1 \| 0 \| 0 \|/);
  assert.match(report, /\| \*\*Total\*\* \| 6 \| 0 \| 0 \|/);
  assert.match(report, /Stars: 4\. Forks: 1\./);
});

test('the report handles an empty history', () => {
  assert.match(renderReport(EMPTY), /No repository statistics yet/);
});

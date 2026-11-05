import assert from 'node:assert/strict';
import { test } from 'node:test';
import { failureReport, updateStatus } from './lib/status.mjs';

const versions = { rails: '8.1.4.1' };

test('records a pass', () => {
  const status = updateStatus({}, [{ id: 'a', passed: true, versions }], '2026-11-05');

  assert.deepEqual(status.a, {
    status: 'pass',
    checked_at: '2026-11-05',
    last_passed_at: '2026-11-05',
    versions,
  });
});

test('a failure keeps the last successful date', () => {
  const previous = updateStatus({}, [{ id: 'a', passed: true, versions }], '2026-11-05');
  const status = updateStatus(previous, [{ id: 'a', passed: false, versions: null }], '2026-11-12');

  assert.equal(status.a.status, 'fail');
  assert.equal(status.a.checked_at, '2026-11-12');
  assert.equal(status.a.last_passed_at, '2026-11-05');
  assert.deepEqual(status.a.versions, versions);
});

test('a recipe that never passed has no successful date', () => {
  const status = updateStatus({}, [{ id: 'a', passed: false, versions: null }], '2026-11-05');

  assert.equal(status.a.last_passed_at, null);
});

test('a partial run keeps other recipes', () => {
  const previous = updateStatus({}, [{ id: 'a', passed: true, versions }], '2026-11-05');
  const status = updateStatus(previous, [{ id: 'b', passed: true, versions }], '2026-11-06');

  assert.deepEqual(Object.keys(status), ['a', 'b']);
  assert.equal(status.a.checked_at, '2026-11-05');
});

test('the report is empty when everything passes', () => {
  assert.equal(failureReport([{ id: 'a', passed: true, output: '' }], '2026-11-05'), null);
});

test('the report names only failed recipes', () => {
  const report = failureReport(
    [
      { id: 'good', passed: true, output: '' },
      { id: 'bad', passed: false, output: 'boom' },
    ],
    '2026-11-05',
  );

  assert.match(report, /## bad/);
  assert.match(report, /boom/);
  assert.doesNotMatch(report, /## good/);
});

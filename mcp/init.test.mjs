import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, test } from 'node:test';
import { addBlock, chooseTarget, runInit } from './init.mjs';

let dir;
let log;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'verified-recipes-init-'));
  log = console.log;
  console.log = () => {};
});

afterEach(() => {
  console.log = log;
  rmSync(dir, { recursive: true, force: true });
});

const read = (name) => readFileSync(join(dir, name), 'utf8');

test('creates AGENTS.md when the project has no instructions file', async () => {
  assert.equal(await runInit(['--yes'], dir), 0);
  assert.match(read('AGENTS.md'), /verified-recipes/);
});

test('keeps existing content and adds the block after it', async () => {
  writeFileSync(join(dir, 'AGENTS.md'), '# My rules\n');

  await runInit(['--yes'], dir);

  assert.match(read('AGENTS.md'), /^# My rules\n\n<!-- verified-recipes:start -->/);
});

test('uses CLAUDE.md when it is the only instructions file', async () => {
  writeFileSync(join(dir, 'CLAUDE.md'), '# Rules\n');

  await runInit(['--yes'], dir);

  assert.match(read('CLAUDE.md'), /verified-recipes/);
  assert.equal(existsSync(join(dir, 'AGENTS.md')), false);
});

test('prefers AGENTS.md when both files exist', () => {
  writeFileSync(join(dir, 'AGENTS.md'), '');
  writeFileSync(join(dir, 'CLAUDE.md'), '');

  assert.equal(chooseTarget(dir), join(dir, 'AGENTS.md'));
});

test('--file selects the target and cannot leave the project folder', () => {
  assert.equal(chooseTarget(dir, 'CLAUDE.md'), join(dir, 'CLAUDE.md'));
  assert.equal(chooseTarget(dir, '../../outside.md'), join(dir, 'outside.md'));
});

test('running twice does not duplicate the block', async () => {
  await runInit(['--yes'], dir);
  const first = read('AGENTS.md');

  assert.equal(await runInit(['--yes'], dir), 0);
  assert.equal(read('AGENTS.md'), first);
  assert.equal(addBlock(first), null);
});

test('without a terminal or --yes, nothing is written', async () => {
  assert.equal(await runInit([], dir), 1);
  assert.equal(existsSync(join(dir, 'AGENTS.md')), false);
});

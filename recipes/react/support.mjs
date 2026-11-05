import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><div id="root"></div>');
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// React must load after the DOM globals exist.
export const { default: React } = await import('react');
export const { default: ReactDOM } = await import('react-dom');
export const { createRoot } = await import('react-dom/client');

export const newContainer = () => document.createElement('div');

export function assertListedError(recipeDir, block) {
  const raw = readFileSync(join(recipeDir, 'recipe.md'), 'utf8');
  const errors = JSON.parse(raw.match(/^errors: (\[.*\])$/m)[1]);
  assert.throws(block, (error) => {
    assert.ok(
      errors.some((message) => error.message.includes(message)),
      `${JSON.stringify(error.message)} is not listed in ${JSON.stringify(errors)}`,
    );
    return true;
  });
}

export function reportVersions() {
  console.log(`VERSIONS ${JSON.stringify({ react: React.version, 'react-dom': ReactDOM.version, node: process.versions.node })}`);
}

// Starts the real server over stdio and calls it the way an MCP client does.
import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: process.execPath,
  args: ['mcp/server.mjs'],
  env: { ...process.env, VERIFIED_RECIPES_INDEX_URL: process.env.VERIFIED_RECIPES_INDEX_URL ?? 'off' },
});
const client = new Client({ name: 'smoke-test', version: '1.0.0' });
await client.connect(transport);

const call = async (name, args) => {
  const result = await client.callTool({ name, arguments: args });
  return { text: result.content[0].text, isError: result.isError };
};

const { tools } = await client.listTools();
assert.deepEqual(tools.map((tool) => tool.name).sort(), ['get_recipe', 'search_recipes']);

const byError = await call('search_recipes', {
  query: 'wrong number of arguments (given 0, expected 1..2) (ArgumentError)',
});
assert.match(byError.text, /rails-enum-positional-syntax/);
assert.match(byError.text, /Verification: verified/);
assert.match(byError.text, /enum :status/);

const recipe = await call('get_recipe', { id: 'rails-enum-positional-syntax' });
assert.equal(recipe.isError, false);
assert.match(recipe.text, /enum status:/);
assert.match(recipe.text, /Tested with: rails /);

assert.equal((await call('search_recipes', { query: 'kubernetes ingress' })).text, 'No recipe covers this.');
assert.equal((await call('get_recipe', { id: 'does-not-exist' })).isError, true);

await client.close();
console.log('MCP smoke test passed');

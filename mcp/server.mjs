#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { renderRecipe, searchRecipes } from './search.mjs';

const REMOTE_INDEX = 'https://pierreangeloaa.github.io/verified-recipes/index.json';
const REMOTE_TIMEOUT_MS = 3000;
const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

function readBundledIndex() {
  return JSON.parse(readFileSync(new URL('../site/index.json', import.meta.url), 'utf8')).recipes;
}

// Verification results change weekly, while the package only changes on release.
// The newest published index wins, and the bundled copy keeps the server working
// offline.
async function loadRecipes() {
  const url = process.env.VERIFIED_RECIPES_INDEX_URL ?? REMOTE_INDEX;
  if (url === 'off') return readBundledIndex();

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(REMOTE_TIMEOUT_MS) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { recipes } = await response.json();
    if (!Array.isArray(recipes)) throw new Error('invalid index');
    return recipes;
  } catch (error) {
    console.error(`Using bundled recipes: ${error.message}`);
    return readBundledIndex();
  }
}

let recipesPromise;
const getRecipes = () => (recipesPromise ??= loadRecipes());

const textResult = (text, isError = false) => ({ content: [{ type: 'text', text }], isError });
const READ_ONLY = { readOnlyHint: true, destructiveHint: false, idempotentHint: true };

const server = new McpServer({ name: 'verified-recipes', version });

server.registerTool(
  'search_recipes',
  {
    title: 'Search verified recipes',
    description:
      'Search short recipes about coding mistakes caused by framework changes. Each recipe is checked by running code. Use before writing framework code, or pass an error message or stack trace after a failure. Returns matching IDs and verification state; an empty list means the topic is not covered.',
    inputSchema: {
      query: z.string().min(1).max(4000).describe('A topic such as "rails enum", or an exact error message'),
      stack: z.string().max(40).optional().describe('Optional stack filter, such as "rails"'),
    },
    annotations: READ_ONLY,
  },
  async ({ query, stack }) => textResult(JSON.stringify(searchRecipes(await getRecipes(), { query, stack }), null, 2)),
);

server.registerTool(
  'get_recipe',
  {
    title: 'Get a verified recipe',
    description:
      'Get one recipe by ID: the mistake, the correct form, the reason, and the versions it was tested with. Check its verification state: "failing" or "stale" means the content may no longer be correct.',
    inputSchema: { id: z.string().min(1).max(120).describe('Recipe ID from search_recipes') },
    annotations: READ_ONLY,
  },
  async ({ id }) => {
    const recipe = (await getRecipes()).find((candidate) => candidate.id === id);
    return recipe ? textResult(renderRecipe(recipe)) : textResult(`No recipe with ID "${id}"`, true);
  },
);

await server.connect(new StdioServerTransport());

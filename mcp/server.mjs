#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { mergeRecipes, renderRecipe, renderSearch } from './search.mjs';

const REMOTE_INDEX = 'https://pierreangeloaa.github.io/verified-recipes/index.json';
const REMOTE_TIMEOUT_MS = 3000;
const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const bundled = JSON.parse(readFileSync(new URL('../site/index.json', import.meta.url), 'utf8')).recipes;
let recipes = bundled;

// Verification results change weekly, while the package only changes on release.
// This runs in the background, so a slow network never delays an answer.
async function refreshRecipes() {
  const url = process.env.VERIFIED_RECIPES_INDEX_URL ?? REMOTE_INDEX;
  if (url === 'off') return;

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(REMOTE_TIMEOUT_MS) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const remote = await response.json();
    if (!Array.isArray(remote.recipes)) throw new Error('invalid index');
    recipes = mergeRecipes(bundled, remote.recipes);
  } catch (error) {
    console.error(`Using bundled recipes: ${error.message}`);
  }
}

const textResult = (text, isError = false) => ({ content: [{ type: 'text', text }], isError });
const READ_ONLY = { readOnlyHint: true, destructiveHint: false, idempotentHint: true };

const server = new McpServer({ name: 'verified-recipes', version });

server.registerTool(
  'search_recipes',
  {
    title: 'Search verified recipes',
    description:
      'Find fixes for framework mistakes, checked by running code. Pass a topic or an error message. A clear match includes the fix.',
    inputSchema: {
      query: z.string().min(1).max(4000).describe('Topic or error message'),
      stack: z.string().max(40).optional().describe('For example: rails'),
    },
    annotations: READ_ONLY,
  },
  async ({ query, stack }) => textResult(renderSearch(recipes, { query, stack })),
);

server.registerTool(
  'get_recipe',
  {
    title: 'Get a verified recipe',
    description: 'Get a full recipe by ID, including the mistake and the reason. Treat "failing" or "stale" as possibly outdated.',
    inputSchema: { id: z.string().min(1).max(120).describe('Recipe ID') },
    annotations: READ_ONLY,
  },
  async ({ id }) => {
    const recipe = recipes.find((candidate) => candidate.id === id);
    return recipe ? textResult(renderRecipe(recipe)) : textResult(`No recipe with ID "${id}"`, true);
  },
);

await server.connect(new StdioServerTransport());
refreshRecipes();

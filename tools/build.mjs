import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRecipes, parseRecipe, validateRecipe } from './lib/recipes.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, 'site');
const statusPath = join(root, 'verification/status.json');
const status = existsSync(statusPath) ? JSON.parse(readFileSync(statusPath, 'utf8')) : {};

const recipes = loadRecipes(root).map((recipe) => {
  const problems = recipe.raw === null
    ? ['missing recipe.md']
    : validateRecipe({
        raw: recipe.raw,
        folderName: recipe.folderName,
        stackFolder: recipe.stack,
        files: recipe.files,
      });
  if (problems.length > 0) {
    throw new Error(`${recipe.folderName} is invalid: ${problems.join('; ')}`);
  }

  const { meta, body } = parseRecipe(recipe.raw);
  return { ...meta, body: body.trim(), verification: status[meta.id] ?? null };
});

rmSync(site, { recursive: true, force: true });
mkdirSync(site, { recursive: true });
writeFileSync(join(site, 'index.json'), `${JSON.stringify({ schema: 1, recipes }, null, 2)}\n`);

console.log(`Built site/index.json with ${recipes.length} recipes`);

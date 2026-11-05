import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRecipes, parseRecipe, validateRecipe } from './lib/recipes.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const seenIds = new Set();
let failures = 0;
const recipes = loadRecipes(root);

for (const recipe of recipes) {
  const problems = recipe.raw === null
    ? ['missing recipe.md']
    : validateRecipe({
        raw: recipe.raw,
        folderName: recipe.folderName,
        stackFolder: recipe.stack,
        files: recipe.files,
      });

  if (recipe.raw !== null && problems.length === 0) {
    const { id } = parseRecipe(recipe.raw).meta;
    if (seenIds.has(id)) problems.push(`duplicate id "${id}"`);
    seenIds.add(id);
  }

  if (problems.length > 0) {
    failures += 1;
    console.error(`FAIL ${relative(root, recipe.dir)}`);
    for (const problem of problems) console.error(`  - ${problem}`);
  }
}

console.log(`${recipes.length - failures}/${recipes.length} recipes valid`);
process.exit(failures > 0 ? 1 : 0);

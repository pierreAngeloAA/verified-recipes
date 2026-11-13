// A recipe's verify.mjs calls checkTs(import.meta.dirname, correct, mistake), each a {path: content} map.
// tsc must accept `correct` and reject `mistake` with every error listed in recipe.md.
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const here = import.meta.dirname;
const TSC = join(here, 'node_modules/typescript/bin/tsc');

function tsc(files) {
  mkdirSync(join(here, 'node_modules/.work'), { recursive: true });
  const dir = mkdtempSync(join(here, 'node_modules/.work/t-')); // under the stack, so @types/node resolves
  try {
    for (const [path, content] of Object.entries(files)) {
      mkdirSync(dirname(join(dir, path)), { recursive: true });
      writeFileSync(join(dir, path), typeof content === 'string' ? content : JSON.stringify(content));
    }
    const r = spawnSync(process.execPath, [TSC, '-p', dir, '--noEmit', '--pretty', 'false'], { encoding: 'utf8' });
    return { ok: r.status === 0, out: r.stdout + r.stderr };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

export function checkTs(recipeDir, correct, mistake) {
  const errors = JSON.parse(readFileSync(join(recipeDir, 'recipe.md'), 'utf8').match(/^errors: (\[.*\])$/m)[1]);
  const good = tsc(correct);
  if (!good.ok) throw new Error(`correct code failed:\n${good.out}`);
  const bad = tsc(mistake);
  if (bad.ok) throw new Error('the mistake compiled, but the recipe says it must fail');
  const missing = errors.filter((e) => !bad.out.includes(e));
  if (missing.length) throw new Error(`listed errors did not appear: ${JSON.stringify(missing)}\ngot: ${bad.out}`);
  const version = (p) => JSON.parse(readFileSync(join(here, 'node_modules', p, 'package.json'), 'utf8')).version;
  console.log(`VERSIONS ${JSON.stringify({ typescript: version('typescript'), node: process.versions.node })}`);
}

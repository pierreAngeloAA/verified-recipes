// A recipe's verify.mjs calls checkNode(import.meta.dirname, correct, mistake), each a {path: content} map
// whose first file is run with this Node. `correct` must exit 0; `mistake` must fail with every listed error.
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

function run(files) {
  const dir = mkdtempSync(join(tmpdir(), 'vr-node-'));
  try {
    for (const [path, content] of Object.entries(files)) writeFileSync(join(dir, path), content);
    const r = spawnSync(process.execPath, [Object.keys(files)[0]], { cwd: dir, encoding: 'utf8' });
    return { ok: r.status === 0, out: r.stdout + r.stderr };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

export function checkNode(recipeDir, correct, mistake) {
  const errors = JSON.parse(readFileSync(join(recipeDir, 'recipe.md'), 'utf8').match(/^errors: (\[.*\])$/m)[1]);
  const good = run(correct);
  if (!good.ok) throw new Error(`correct code failed:\n${good.out}`);
  const bad = run(mistake);
  if (bad.ok) throw new Error('the mistake ran, but the recipe says it must fail');
  const missing = errors.filter((e) => !bad.out.includes(e));
  if (missing.length) throw new Error(`listed errors did not appear: ${JSON.stringify(missing)}\ngot: ${bad.out}`);
  console.log(`VERSIONS ${JSON.stringify({ node: process.versions.node })}`);
}

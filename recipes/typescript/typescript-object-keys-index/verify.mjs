import { checkTs } from '../support.mjs';

const BASE = { 'tsconfig.json': { compilerOptions: {} } };
checkTs(import.meta.dirname,
  { ...BASE, 'index.ts': 'const cfg = { a: 1 }; for (const [k, v] of Object.entries(cfg)) console.log(k, v);' },
  { ...BASE, 'index.ts': 'const cfg = { a: 1 }; for (const k of Object.keys(cfg)) console.log(cfg[k]);' });

import { checkTs } from '../support.mjs';

const BASE = { 'tsconfig.json': { compilerOptions: { module: 'nodenext' } }, 'a.ts': 'export const a = 1;' };
checkTs(import.meta.dirname,
  { ...BASE, 'index.ts': 'import { a } from "./a.js"; console.log(a);' },
  { ...BASE, 'index.ts': 'import { a } from "./a"; console.log(a);' });

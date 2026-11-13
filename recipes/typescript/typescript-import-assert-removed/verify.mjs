import { checkTs } from '../support.mjs';

const BASE = { 'tsconfig.json': { compilerOptions: { module: 'nodenext', resolveJsonModule: true } }, 'd.json': '{"a":1}' };
checkTs(import.meta.dirname,
  { ...BASE, 'index.ts': 'import d from "./d.json" with { type: "json" }; console.log(d);' },
  { ...BASE, 'index.ts': 'import d from "./d.json" assert { type: "json" }; console.log(d);' });

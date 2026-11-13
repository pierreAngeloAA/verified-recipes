import { checkTs } from '../support.mjs';

const BASE = { 'tsconfig.json': { compilerOptions: { module: 'nodenext', verbatimModuleSyntax: true } }, 'user.ts': 'export type User = { id: number };' };
checkTs(import.meta.dirname,
  { ...BASE, 'index.ts': 'import type { User } from "./user.js"; const u: User = { id: 1 }; console.log(u);' },
  { ...BASE, 'index.ts': 'import { User } from "./user.js"; const u: User = { id: 1 }; console.log(u);' });

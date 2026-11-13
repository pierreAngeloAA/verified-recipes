import { checkTs } from '../support.mjs';

checkTs(import.meta.dirname,
  { 'tsconfig.json': { compilerOptions: { target: 'es2022' } }, 'index.ts': 'export {};' },
  { 'tsconfig.json': { compilerOptions: { target: 'es5' } }, 'index.ts': 'export {};' });

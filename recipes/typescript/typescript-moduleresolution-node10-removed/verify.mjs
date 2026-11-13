import { checkTs } from '../support.mjs';

checkTs(import.meta.dirname,
  { 'tsconfig.json': { compilerOptions: { module: 'esnext', moduleResolution: 'bundler' } }, 'index.ts': 'export {};' },
  { 'tsconfig.json': { compilerOptions: { module: 'commonjs', moduleResolution: 'node' } }, 'index.ts': 'export {};' });

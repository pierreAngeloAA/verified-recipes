import { checkTs } from '../support.mjs';

const SRC = 'console.log(process.env.HOME);';
checkTs(import.meta.dirname,
  { 'tsconfig.json': { compilerOptions: { types: ['node'] } }, 'index.ts': SRC },
  { 'tsconfig.json': { compilerOptions: {} }, 'index.ts': SRC });

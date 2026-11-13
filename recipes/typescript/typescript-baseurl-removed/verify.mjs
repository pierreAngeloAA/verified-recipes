import { checkTs } from '../support.mjs';

checkTs(import.meta.dirname,
  { 'tsconfig.json': { compilerOptions: { paths: { '@/*': ['./src/*'] } } }, 'src/a.ts': 'export const a = 1;', 'index.ts': "import { a } from '@/a'; console.log(a);" },
  { 'tsconfig.json': { compilerOptions: { baseUrl: 'src', paths: { '@/*': ['*'] } } }, 'src/a.ts': 'export const a = 1;', 'index.ts': "import { a } from '@/a'; console.log(a);" });

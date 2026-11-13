import { checkTs } from '../support.mjs';

const BASE = { 'tsconfig.json': { compilerOptions: {} } };
checkTs(import.meta.dirname,
  { ...BASE, 'index.ts': 'try {} catch (e) { console.log(e instanceof Error ? e.message : String(e)); }' },
  { ...BASE, 'index.ts': 'try {} catch (e) { console.log(e.message); }' });

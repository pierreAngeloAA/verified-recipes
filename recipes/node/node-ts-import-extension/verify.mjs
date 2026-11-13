import { checkNode } from '../support.mjs';

checkNode(import.meta.dirname,
  {
    "a.ts": "import { a } from './u.ts'; if (a !== 1) process.exit(1);",
    "u.ts": "export const a: number = 1;",
  },
  {
    "a.ts": "import { a } from './u'; console.log(a);",
    "u.ts": "export const a: number = 1;",
  });

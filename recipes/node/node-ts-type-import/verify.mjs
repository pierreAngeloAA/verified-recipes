import { checkNode } from '../support.mjs';

checkNode(import.meta.dirname,
  {
    "a.ts": "import { type User, load } from './u.ts'; const x: User = load(); if (x.id !== 1) process.exit(1);",
    "u.ts": "export type User = { id: number }; export const load = (): User => ({ id: 1 });",
  },
  {
    "a.ts": "import { User, load } from './u.ts'; const x: User = load(); console.log(x);",
    "u.ts": "export type User = { id: number }; export const load = (): User => ({ id: 1 });",
  });

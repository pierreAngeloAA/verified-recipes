import { checkNode } from '../support.mjs';

checkNode(import.meta.dirname,
  {
    "a.ts": "const Color = { Red: 0, Blue: 1 } as const; type Color = (typeof Color)[keyof typeof Color]; const c: Color = Color.Blue; if (c !== 1) process.exit(1);",
  },
  {
    "a.ts": "enum Color { Red, Blue } console.log(Color.Blue);",
  });

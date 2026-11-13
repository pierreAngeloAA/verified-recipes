import { checkNode } from '../support.mjs';

checkNode(import.meta.dirname,
  {
    "a.mjs": "import d from './d.json' with { type: 'json' }; if (d.a !== 1) process.exit(1);",
    "d.json": "{\"a\":1}",
  },
  {
    "a.mjs": "import d from './d.json' assert { type: 'json' };",
    "d.json": "{\"a\":1}",
  });

import { checkNode } from '../support.mjs';

checkNode(import.meta.dirname,
  {
    "a.mjs": "import fs from 'node:fs'; import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); if (require('node:fs') !== fs) process.exit(1);",
  },
  {
    "a.mjs": "const fs = require('fs');",
  });

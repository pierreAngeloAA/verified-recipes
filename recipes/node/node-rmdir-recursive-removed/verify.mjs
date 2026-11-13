import { checkNode } from '../support.mjs';

checkNode(import.meta.dirname,
  {
    "a.mjs": "import fs from 'node:fs'; fs.mkdirSync('d/e', { recursive: true }); fs.rmSync('d', { recursive: true, force: true }); if (fs.existsSync('d')) process.exit(1);",
  },
  {
    "a.mjs": "import fs from 'node:fs'; fs.mkdirSync('d/e', { recursive: true }); fs.rmdirSync('d', { recursive: true });",
  });

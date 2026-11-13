import { checkNode } from '../support.mjs';

checkNode(import.meta.dirname,
  {
    "a.mjs": "import path from 'node:path'; if (!path.isAbsolute(import.meta.dirname) || !import.meta.filename.endsWith('a.mjs')) process.exit(1);",
  },
  {
    "a.mjs": "console.log(__dirname);",
  });

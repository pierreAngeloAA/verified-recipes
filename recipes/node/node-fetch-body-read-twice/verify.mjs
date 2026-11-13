import { checkNode } from '../support.mjs';

checkNode(import.meta.dirname,
  {
    "a.mjs": "const res = new Response('{\"a\":1}'); const text = await res.text(); if (JSON.parse(text).a !== 1) process.exit(1);",
  },
  {
    "a.mjs": "const res = new Response('{\"a\":1}'); await res.text(); await res.json();",
  });

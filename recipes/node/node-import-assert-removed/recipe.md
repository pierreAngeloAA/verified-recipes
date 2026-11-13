---
id: node-import-assert-removed
title: Import assertions are removed; use with { type: 'json' }
stack: node
applies_to: ">= 22"
tags: ["esm", "json", "imports", "syntax"]
errors: ["SyntaxError: Unexpected identifier 'assert'"]
sources: ["https://nodejs.org/api/esm.html#import-attributes"]
---

## Mistake

```js
import cfg from './cfg.json' assert { type: 'json' };
```

## Correct

```js
import cfg from './cfg.json' with { type: 'json' };
```

## Why

`assert` was dropped in Node 22. TypeScript also needs `with` (see typescript-import-assert-removed).

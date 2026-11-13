---
id: node-esm-require
title: require is not defined in ES modules
stack: node
applies_to: ">= 20"
tags: ["esm", "modules", "commonjs", "imports"]
errors: ["require is not defined in ES module scope"]
sources: ["https://nodejs.org/api/module.html#modulecreaterequirefilename"]
---

## Mistake

```js
const fs = require('fs');
```

## Correct

```js
import fs from 'node:fs';
// CommonJS-only package: import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);
```

## Why

ESM uses `import`. The reverse works: `require()` can load ESM since Node 22.12.

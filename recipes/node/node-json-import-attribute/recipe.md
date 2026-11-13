---
id: node-json-import-attribute
title: Importing JSON in ESM needs the type attribute
stack: node
applies_to: ">= 22"
tags: ["esm", "json", "imports"]
errors: ["ERR_IMPORT_ATTRIBUTE_MISSING"]
sources: ["https://nodejs.org/api/esm.html#json-modules"]
---

## Mistake

```js
import cfg from './cfg.json';
```

## Correct

```js
import cfg from './cfg.json' with { type: 'json' };
// or: JSON.parse(fs.readFileSync(new URL('./cfg.json', import.meta.url)))
```

## Why

Only a default export. `require('./cfg.json')` still works in CommonJS.

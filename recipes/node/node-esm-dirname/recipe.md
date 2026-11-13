---
id: node-esm-dirname
title: __dirname does not exist in ES modules
stack: node
applies_to: ">= 20.11"
tags: ["esm", "paths", "modules"]
errors: ["__dirname is not defined in ES module scope"]
sources: ["https://nodejs.org/api/esm.html#importmetadirname"]
---

## Mistake

```js
const file = path.join(__dirname, 'data.txt');
```

## Correct

```js
const file = path.join(import.meta.dirname, 'data.txt');
// import.meta.filename replaces __filename
```

## Why

ESM (`.mjs` or `"type": "module"`) has no CommonJS wrapper. `import.meta.dirname` exists since Node 20.11.

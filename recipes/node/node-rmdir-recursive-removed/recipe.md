---
id: node-rmdir-recursive-removed
title: fs.rmdir recursive is gone; use fs.rm
stack: node
applies_to: ">= 26"
tags: ["fs", "files", "migration"]
errors: ["The property 'options.recursive' is no longer supported"]
sources: ["https://nodejs.org/api/fs.html#fsrmsyncpath-options"]
---

## Mistake

```js
fs.rmdirSync(dir, { recursive: true });
```

## Correct

```js
fs.rmSync(dir, { recursive: true, force: true }); // force: no error if missing
```

## Why

`rmdir` only removes empty folders now. Same for `fs.promises.rmdir` → `fs.promises.rm`.

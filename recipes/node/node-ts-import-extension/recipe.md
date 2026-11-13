---
id: node-ts-import-extension
title: node file.ts needs the .ts extension in relative imports
stack: node
applies_to: ">= 22.18"
tags: ["typescript", "type-stripping", "esm", "imports"]
errors: ["ERR_MODULE_NOT_FOUND"]
sources: ["https://nodejs.org/api/typescript.html#importing-types-without-type-keyword"]
---

## Mistake

```ts
import { a } from './util';
```

## Correct

```ts
import { a } from './util.ts';
// tsconfig: allowImportingTsExtensions + rewriteRelativeImportExtensions
```

## Why

Node resolves paths literally, without guessing extensions.

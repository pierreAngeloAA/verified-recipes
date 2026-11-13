---
id: typescript-nodenext-import-extension
title: Relative imports need .js under nodenext
stack: typescript
applies_to: ">= 4.7"
tags: ["esm", "modules", "imports", "node"]
errors: ["TS2835: Relative import paths need explicit file extensions"]
sources: ["https://www.typescriptlang.org/docs/handbook/modules/reference.html"]
---

## Mistake

```ts
import { a } from "./a";
```

## Correct

```ts
import { a } from "./a.js"; // .js even though the file is a.ts
```

## Why

Node ESM resolves the emitted file literally. Or enable `rewriteRelativeImportExtensions` and write `./a.ts`.

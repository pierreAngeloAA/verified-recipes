---
id: typescript-import-assert-removed
title: Import assertions (assert {}) are replaced by with {}
stack: typescript
applies_to: ">= 6.0"
tags: ["esm", "json", "imports", "syntax"]
errors: ["TS2880: Import assertions have been replaced by import attributes. Use 'with' instead of 'assert'."]
sources: ["https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-3.html"]
---

## Mistake

```ts
import data from "./data.json" assert { type: "json" };
```

## Correct

```ts
import data from "./data.json" with { type: "json" };
```

## Why

`assert` was a TC39 draft; Node 22+ removed it and tsc rejects it under nodenext.

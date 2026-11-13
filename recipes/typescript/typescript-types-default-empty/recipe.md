---
id: typescript-types-default-empty
title: types defaults to []; list @types packages in tsconfig
stack: typescript
applies_to: ">= 6.0"
tags: ["tsconfig", "types", "node", "migration"]
errors: ["TS2591: Cannot find name 'process'"]
sources: ["https://www.typescriptlang.org/tsconfig/#types"]
---

## Mistake

```json
// tsconfig.json without "types": process, Buffer, describe... are unknown
{ "compilerOptions": {} }
```

## Correct

```json
// tsconfig.json
{ "compilerOptions": { "types": ["node"] } }
```

## Why

Since TS 6, globals from `@types/*` are not loaded automatically. Add each one (node, jest, bun...) to `types`.

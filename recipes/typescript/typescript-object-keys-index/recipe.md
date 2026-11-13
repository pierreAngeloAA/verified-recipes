---
id: typescript-object-keys-index
title: Object.keys returns string[], so obj[key] fails
stack: typescript
applies_to: ">= 2.0"
tags: ["objects", "indexing", "strict"]
errors: ["TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type"]
sources: ["https://www.typescriptlang.org/tsconfig/#noImplicitAny"]
---

## Mistake

```ts
for (const k of Object.keys(cfg)) log(cfg[k]);
```

## Correct

```ts
for (const [k, v] of Object.entries(cfg)) log(k, v);
// or: (Object.keys(cfg) as (keyof typeof cfg)[])
```

## Why

Objects may have extra keys at runtime, so keys are typed as `string`.

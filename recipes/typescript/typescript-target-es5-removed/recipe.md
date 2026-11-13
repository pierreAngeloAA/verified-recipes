---
id: typescript-target-es5-removed
title: target ES5 is removed
stack: typescript
applies_to: ">= 7.0"
tags: ["tsconfig", "target", "migration"]
errors: ["TS5108: Option 'target=ES5' has been removed"]
sources: ["https://www.typescriptlang.org/tsconfig/#target"]
---

## Mistake

```json
{ "compilerOptions": { "target": "es5" } }
```

## Correct

```json
{ "compilerOptions": { "target": "es2022" } }
```

## Why

TS 7 emits ES2015+ only. For older browsers, transpile the output with a bundler or Babel.

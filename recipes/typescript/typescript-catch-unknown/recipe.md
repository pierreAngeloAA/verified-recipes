---
id: typescript-catch-unknown
title: catch variables are unknown in strict mode
stack: typescript
applies_to: ">= 4.4"
tags: ["errors", "strict", "unknown"]
errors: ["TS18046: 'e' is of type 'unknown'"]
sources: ["https://www.typescriptlang.org/tsconfig/#useUnknownInCatchVariables"]
---

## Mistake

```ts
catch (e) { log(e.message); }
```

## Correct

```ts
catch (e) { log(e instanceof Error ? e.message : String(e)); }
```

## Why

Anything can be thrown. `strict` (default since TS 6) enables `useUnknownInCatchVariables`.

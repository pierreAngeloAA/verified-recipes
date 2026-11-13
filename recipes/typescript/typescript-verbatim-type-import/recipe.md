---
id: typescript-verbatim-type-import
title: Types need import type under verbatimModuleSyntax
stack: typescript
applies_to: ">= 5.0"
tags: ["imports", "types", "esm", "isolatedModules"]
errors: ["TS1484: 'User' is a type and must be imported using a type-only import"]
sources: ["https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax"]
---

## Mistake

```ts
import { User } from "./user.js";
```

## Correct

```ts
import type { User } from "./user.js";
// mixed: import { load, type User } from "./user.js";
```

## Why

The import is emitted as written, so a type-only name would crash at runtime. Common in Vite, Angular and Node type-stripping setups.

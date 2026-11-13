---
id: rust-static-mut-reference
title: References to static mut are errors in edition 2024
stack: rust
applies_to: ">= 1.85"
tags: ["edition-2024", "statics", "unsafe", "concurrency"]
errors: ["creating a shared reference to mutable static"]
sources: ["https://doc.rust-lang.org/edition-guide/rust-2024/static-mut-references.html"]
---

## Mistake

```rust
static mut COUNT: u32 = 0;
unsafe { COUNT += 1; println!("{}", &COUNT); }
```

## Correct

```rust
use std::sync::atomic::{AtomicU32, Ordering};
static COUNT: AtomicU32 = AtomicU32::new(0);
COUNT.fetch_add(1, Ordering::Relaxed);
// complex data: static X: Mutex<T> / OnceLock<T> / LazyLock<T>
```

## Why

Any reference to a static mut is instant UB if another one is live. Raw access: `&raw const COUNT`.

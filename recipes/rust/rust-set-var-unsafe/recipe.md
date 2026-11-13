---
id: rust-set-var-unsafe
title: std::env::set_var and remove_var are unsafe in edition 2024
stack: rust
applies_to: ">= 1.85"
tags: ["edition-2024", "env", "unsafe", "threads"]
errors: ["call to unsafe function `set_var` is unsafe and requires unsafe block"]
sources: ["https://doc.rust-lang.org/edition-guide/rust-2024/newly-unsafe-functions.html"]
---

## Mistake

```rust
std::env::set_var("RUST_LOG", "debug");
```

## Correct

```rust
// SAFETY: single-threaded, before any thread or runtime starts
unsafe { std::env::set_var("RUST_LOG", "debug") };
// better: pass config explicitly or use Command::env for child processes
```

## Why

Changing the environment races with other threads reading it (libc getenv).

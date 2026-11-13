---
id: rust-unsafe-extern-blocks
title: extern blocks must be unsafe extern in edition 2024
stack: rust
applies_to: ">= 1.85"
tags: ["edition-2024", "ffi", "unsafe"]
errors: ["extern blocks must be unsafe"]
sources: ["https://doc.rust-lang.org/edition-guide/rust-2024/unsafe-extern.html"]
---

## Mistake

```rust
extern "C" {
    fn abs(x: i32) -> i32;
}
```

## Correct

```rust
unsafe extern "C" {
    pub safe fn abs(x: i32) -> i32;  // `safe` items need no unsafe block to call
}
```

## Why

Declaring foreign items is an unchecked promise about their signatures.

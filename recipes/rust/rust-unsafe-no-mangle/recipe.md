---
id: rust-unsafe-no-mangle
title: #[no_mangle] and #[export_name] must be #[unsafe(...)]
stack: rust
applies_to: ">= 1.85"
tags: ["edition-2024", "ffi", "attributes"]
errors: ["unsafe attribute used without unsafe"]
sources: ["https://doc.rust-lang.org/edition-guide/rust-2024/unsafe-attributes.html"]
---

## Mistake

```rust
#[no_mangle]
pub extern "C" fn handler() {}
```

## Correct

```rust
#[unsafe(no_mangle)]
pub extern "C" fn handler() {}
```

## Why

Unmangled symbols can collide with other symbols; edition 2024 makes that explicit. Same for `link_section` and `export_name`.

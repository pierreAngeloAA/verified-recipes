---
id: rust-string-index
title: Strings can't be indexed by integer
stack: rust
applies_to: ">= 1.0"
tags: ["strings", "utf-8"]
errors: ["the type `str` cannot be indexed by `{integer}`"]
sources: ["https://doc.rust-lang.org/book/ch08-02-strings.html#indexing-into-strings"]
---

## Mistake

```rust
let first = s[0];
```

## Correct

```rust
let first = s.chars().next();     // Option<char>
let byte = s.as_bytes()[0];       // u8
let head = &s[..3];               // byte range; panics if not on a char boundary
```

## Why

UTF-8 characters are 1-4 bytes, so integer indexing has no O(1) meaning.

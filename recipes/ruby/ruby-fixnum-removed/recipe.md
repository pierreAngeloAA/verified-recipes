---
id: ruby-fixnum-removed
title: Fixnum and Bignum are removed; use Integer
stack: ruby
applies_to: ">= 3.2"
tags: ["integers", "types", "migration"]
errors: ["uninitialized constant Fixnum"]
sources: ["https://docs.ruby-lang.org/en/master/Integer.html"]
---

## Mistake

```ruby
value.is_a?(Fixnum)
```

## Correct

```ruby
value.is_a?(Integer)
```

## Why

Unified into Integer in 2.4 and removed in 3.2. Old gems referencing them break.

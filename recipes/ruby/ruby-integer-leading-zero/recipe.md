---
id: ruby-integer-leading-zero
title: Integer() reads a leading 0 as octal
stack: ruby
applies_to: ">= 1.9"
tags: ["parsing", "integers", "dates"]
errors: ["invalid value for Integer(): \"08\""]
sources: ["https://docs.ruby-lang.org/en/master/Kernel.html#method-i-Integer"]
---

## Mistake

```ruby
month = Integer("08")
```

## Correct

```ruby
month = Integer("08", 10)  # base 10; "08".to_i never raises but returns 0 for junk
```

## Why

"010" silently becomes 8. Common when parsing dates and zero-padded ids.

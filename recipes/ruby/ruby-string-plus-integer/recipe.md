---
id: ruby-string-plus-integer
title: String + Integer raises; interpolate instead
stack: ruby
applies_to: ">= 1.9"
tags: ["strings", "types"]
errors: ["no implicit conversion of Integer into String"]
sources: ["https://docs.ruby-lang.org/en/master/String.html#method-i-2B"]
---

## Mistake

```ruby
msg = "Total: " + count
```

## Correct

```ruby
msg = "Total: #{count}"
```

## Why

Ruby never converts implicitly; interpolation calls to_s.

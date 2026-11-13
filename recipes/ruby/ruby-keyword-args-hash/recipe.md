---
id: ruby-keyword-args-hash
title: A Hash is no longer converted to keyword arguments
stack: ruby
applies_to: ">= 3.0"
tags: ["keyword-arguments", "methods", "migration"]
errors: ["wrong number of arguments (given 1, expected 0; required keywords: name, age)"]
sources: ["https://www.ruby-lang.org/en/news/2019/12/12/separation-of-positional-and-keyword-arguments-in-ruby-3-0/"]
---

## Mistake

```ruby
def create(name:, age:) = [name, age]
opts = { name: "Ada", age: 36 }
create(opts)
```

## Correct

```ruby
create(**opts)
```

## Why

Ruby 3 separated positional and keyword arguments. Also affects delegation: use `(...)` or `*args, **kwargs, &blk`.

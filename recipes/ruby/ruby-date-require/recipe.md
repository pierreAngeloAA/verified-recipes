---
id: ruby-date-require
title: Date needs require "date" outside Rails
stack: ruby
applies_to: ">= 2.0"
tags: ["dates", "stdlib", "require"]
errors: ["uninitialized constant Date"]
sources: ["https://docs.ruby-lang.org/en/master/Date.html"]
---

## Mistake

```ruby
puts Date.today
```

## Correct

```ruby
require "date"
puts Date.today
```

## Why

Date is a default gem, not core.

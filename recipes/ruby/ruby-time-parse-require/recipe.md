---
id: ruby-time-parse-require
title: Time.parse and Time#iso8601 need require "time"
stack: ruby
applies_to: ">= 2.0"
tags: ["time", "stdlib", "require"]
errors: ["undefined method", "parse"]
sources: ["https://docs.ruby-lang.org/en/master/Time.html#method-c-parse"]
---

## Mistake

```ruby
t = Time.parse("2026-01-05 10:00")
```

## Correct

```ruby
require "time"
t = Time.parse("2026-01-05 10:00")  # or Time.iso8601(str)
```

## Why

Rails loads it for you, so plain scripts and gems fail. Same for Date (require "date") and JSON.

---
id: rails-to-fs-date-format
title: Rails date and time formats use to_fs, not to_s
stack: rails
applies_to: ">= 7.1"
tags: ["activesupport", "date", "time", "format", "upgrade"]
errors: ["wrong number of arguments (given 1, expected 0)"]
sources: ["https://guides.rubyonrails.org/7_1_release_notes.html"]
---

## Mistake

```ruby
Time.current.to_s(:db)
Date.current.to_s(:long)
```

## Correct

```ruby
Time.current.to_fs(:db)
Date.current.to_fs(:long)
```

## Why

Rails 7.1 removed the option to pass a format to `to_s` on `Date`, `DateTime`, `Time` and related classes. `to_fs` takes the same format names, and `to_formatted_s` remains an alias.

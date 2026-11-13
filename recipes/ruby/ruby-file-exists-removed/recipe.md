---
id: ruby-file-exists-removed
title: File.exists? and Dir.exists? are removed; use exist?
stack: ruby
applies_to: ">= 3.2"
tags: ["files", "migration"]
errors: ["undefined method", "exists?"]
sources: ["https://docs.ruby-lang.org/en/master/File.html#method-c-exist-3F"]
---

## Mistake

```ruby
File.exists?(path)
Dir.exists?(dir)
```

## Correct

```ruby
File.exist?(path)
Dir.exist?(dir)
```

## Why

The plural aliases were deprecated for years and removed in Ruby 3.2.

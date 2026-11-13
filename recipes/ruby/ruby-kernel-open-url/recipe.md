---
id: ruby-kernel-open-url
title: open(url) no longer fetches URLs; use URI.open
stack: ruby
applies_to: ">= 3.0"
tags: ["http", "open-uri", "security"]
errors: ["No such file or directory @ rb_sysopen"]
sources: ["https://docs.ruby-lang.org/en/master/OpenURI.html"]
---

## Mistake

```ruby
require "open-uri"
body = open(url).read
```

## Correct

```ruby
require "open-uri"
body = URI.open(url).read
# or Net::HTTP.get(URI(url))
```

## Why

Kernel#open with user input could spawn commands (`|cmd`); Ruby 3 dropped the URL hook.

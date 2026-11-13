---
id: ruby-uri-escape-removed
title: URI.escape is removed; pick the right encoder
stack: ruby
applies_to: ">= 3.0"
tags: ["uri", "encoding", "migration"]
errors: ["undefined method", "escape"]
sources: ["https://docs.ruby-lang.org/en/master/URI.html#method-c-encode_www_form_component"]
---

## Mistake

```ruby
url = "#{base}/search?q=#{URI.escape(query)}"
```

## Correct

```ruby
url = "#{base}/search?#{URI.encode_www_form(q: query)}"
# one value: URI.encode_www_form_component(query); path segment: ERB::Util.url_encode(s)
```

## Why

URI.escape could not tell a path from a query and was removed in 3.0.

---
id: rails-find-by-positional-id
title: find_by needs a hash (find_by(id: x))
stack: rails
applies_to: ">= 8.0"
tags: ["activerecord", "queries"]
errors: ["Unsupported argument type: 1 (Integer)"]
sources: ["https://api.rubyonrails.org/classes/ActiveRecord/FinderMethods.html#method-i-find_by"]
---

## Mistake

```ruby
Article.find_by(params[:id])
```

## Correct

```ruby
Article.find_by(id: params[:id])
```

## Why

find_by takes conditions like where; only find takes a bare id.

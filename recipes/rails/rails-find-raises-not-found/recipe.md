---
id: rails-find-raises-not-found
title: find raises RecordNotFound; use find_by when nil is expected
stack: rails
applies_to: ">= 8.0"
tags: ["activerecord", "queries", "errors"]
errors: ["Couldn't find Article with 'id'=999"]
sources: ["https://api.rubyonrails.org/classes/ActiveRecord/FinderMethods.html#method-i-find_by"]
---

## Mistake

```ruby
article = Article.find(params[:id]) rescue nil
return head :not_found unless article
```

## Correct

```ruby
article = Article.find_by(id: params[:id])
return head :not_found unless article
# or let find raise: Rails renders 404 for RecordNotFound in production
```

## Why

find is for ids that must exist; rescue nil also hides real errors.

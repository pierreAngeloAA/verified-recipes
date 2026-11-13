---
id: rails-scope-needs-callable
title: Scope bodies must be lambdas
stack: rails
applies_to: ">= 8.0"
tags: ["activerecord", "scopes"]
errors: ["The scope body needs to be callable."]
sources: ["https://guides.rubyonrails.org/active_record_querying.html#scopes"]
---

## Mistake

```ruby
scope :published, where(published: true)
```

## Correct

```ruby
scope :published, -> { where(published: true) }
```

## Why

A non-lambda body would run once at class load and freeze the query.

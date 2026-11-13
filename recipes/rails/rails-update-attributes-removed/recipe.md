---
id: rails-update-attributes-removed
title: update_attributes is removed; use update
stack: rails
applies_to: ">= 8.0"
tags: ["activerecord", "migration"]
errors: ["update_attributes' for an instance of Article"]
sources: ["https://api.rubyonrails.org/classes/ActiveRecord/Persistence.html#method-i-update"]
---

## Mistake

```ruby
post.update_attributes(title: "New")
```

## Correct

```ruby
post.update(title: "New")  # update! raises on validation failure
```

## Why

Removed in Rails 6.1 (with update_attributes!).

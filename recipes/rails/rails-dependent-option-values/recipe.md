---
id: rails-dependent-option-values
title: has_many dependent: accepts :destroy, not :destroy_all
stack: rails
applies_to: ">= 8.0"
tags: ["activerecord", "associations"]
errors: ["The :dependent option must be one of [:destroy, :delete_all, :nullify, :restrict_with_error, :restrict_with_exception, :destroy_async], but is :destroy_all"]
sources: ["https://guides.rubyonrails.org/association_basics.html#dependent"]
---

## Mistake

```ruby
has_many :comments, dependent: :destroy_all
```

## Correct

```ruby
has_many :comments, dependent: :destroy        # callbacks per record
# fast, no callbacks: dependent: :delete_all; background: :destroy_async
```

## Why

The option names the strategy, not the relation method.

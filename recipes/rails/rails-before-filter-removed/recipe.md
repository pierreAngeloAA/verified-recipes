---
id: rails-before-filter-removed
title: before_filter is removed; use before_action
stack: rails
applies_to: ">= 8.0"
tags: ["actioncontroller", "callbacks", "migration"]
errors: ["before_filter' for class"]
sources: ["https://guides.rubyonrails.org/action_controller_overview.html#controller-callbacks"]
---

## Mistake

```ruby
before_filter :authenticate_user!
skip_before_filter :verify_authenticity_token
```

## Correct

```ruby
before_action :authenticate_user!
skip_before_action :verify_authenticity_token
```

## Why

All *_filter callbacks were removed in Rails 5.1.

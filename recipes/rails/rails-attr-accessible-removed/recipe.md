---
id: rails-attr-accessible-removed
title: attr_accessible is gone; use strong parameters
stack: rails
applies_to: ">= 8.0"
tags: ["activerecord", "mass-assignment", "security", "migration"]
errors: ["attr_accessible' for class"]
sources: ["https://guides.rubyonrails.org/action_controller_overview.html#strong-parameters"]
---

## Mistake

```ruby
class User < ApplicationRecord
  attr_accessible :name, :email
end
```

## Correct

```ruby
# controller
def user_params = params.expect(user: [:name, :email])
User.create(user_params)
```

## Why

Whitelisting moved from models to controllers in Rails 4.

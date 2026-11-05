---
id: rails-enum-positional-syntax
title: Rails 8 rejects enum declared with keyword arguments
stack: rails
applies_to: ">= 8.0"
tags: ["activerecord", "enum", "model", "upgrade"]
errors: ["wrong number of arguments (given 0, expected 1..2)"]
sources: ["https://guides.rubyonrails.org/8_0_release_notes.html", "https://api.rubyonrails.org/classes/ActiveRecord/Enum.html"]
---

## Mistake

```ruby
class Post < ApplicationRecord
  enum status: { draft: 0, published: 1 }
end
```

## Correct

```ruby
class Post < ApplicationRecord
  enum :status, { draft: 0, published: 1 }
end
```

## Why

Rails 8.0 removed support for defining `enum` with keyword arguments. The attribute name is now the first positional argument. The error appears when the class loads, so it can surface far from the line being edited.

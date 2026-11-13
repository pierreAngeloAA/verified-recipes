---
id: rails-belongs-to-required
title: belongs_to is required by default; use optional: true
stack: rails
applies_to: ">= 8.0"
tags: ["activerecord", "associations", "validations"]
errors: ["Validation failed: Author must exist"]
sources: ["https://guides.rubyonrails.org/association_basics.html#optional"]
---

## Mistake

```ruby
class Article < ApplicationRecord
  belongs_to :author
end
Article.create!(title: "Draft")  # no author yet
```

## Correct

```ruby
class Article < ApplicationRecord
  belongs_to :author, optional: true
end
```

## Why

Apps on load_defaults 5.0+ validate presence of every belongs_to. Prefer setting the association over making it optional.

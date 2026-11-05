---
id: rails-serialize-coder-keyword
title: Rails serialize needs the coder keyword
stack: rails
applies_to: ">= 7.2"
tags: ["activerecord", "serialize", "json", "model", "upgrade"]
errors: ["wrong number of arguments (given 2, expected 1)"]
sources: ["https://guides.rubyonrails.org/7_2_release_notes.html"]
---

## Mistake

```ruby
class Post < ApplicationRecord
  serialize :prefs, JSON
end
```

## Correct

```ruby
class Post < ApplicationRecord
  serialize :prefs, coder: JSON
end
```

To restrict the stored value to a class, use `serialize :prefs, type: Hash, coder: YAML`.

## Why

Rails 7.2 removed support for passing the coder or class as the second positional argument to `serialize`. The error appears when the class loads.

---
id: rails-deprecator-instance
title: ActiveSupport::Deprecation.warn is no longer a public class method
stack: rails
applies_to: ">= 8.0"
tags: ["activesupport", "deprecation", "gem", "upgrade"]
errors: ["private method `warn' called for class ActiveSupport::Deprecation", "private method 'warn' called for class ActiveSupport::Deprecation"]
sources: ["https://guides.rubyonrails.org/7_1_release_notes.html"]
---

## Mistake

```ruby
ActiveSupport::Deprecation.warn("Use new_method instead")
```

## Correct

```ruby
MyGem.deprecator = ActiveSupport::Deprecation.new("2.0", "MyGem")
MyGem.deprecator.warn("Use new_method instead")
```

In an application, register the instance with `Rails.application.deprecators[:my_gem]` so that it follows the application's deprecation settings.

## Why

Rails 7.1 introduced deprecator instances owned by each library. On current Rails, the old class-level call raises `NoMethodError`, which turns a harmless warning into a crash at the call site.

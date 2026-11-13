---
id: rails-forbidden-attributes
title: Unpermitted params raise ForbiddenAttributesError
stack: rails
applies_to: ">= 8.0"
tags: ["actioncontroller", "strong-parameters", "security"]
errors: ["ActiveModel::ForbiddenAttributesError"]
sources: ["https://guides.rubyonrails.org/action_controller_overview.html#strong-parameters"]
---

## Mistake

```ruby
Article.create(params[:article])
```

## Correct

```ruby
Article.create(params.expect(article: [:title, :body]))
```

## Why

Raw params are not permitted. Never call permit! on user input.

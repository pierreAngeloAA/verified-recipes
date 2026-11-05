---
id: rails-params-expect
title: Use params.expect so tampered parameters return 400 instead of 500
stack: rails
applies_to: ">= 8.0"
tags: ["actioncontroller", "params", "strong-parameters", "security"]
errors: ["undefined method `permit' for an instance of String", "undefined method 'permit' for an instance of String"]
sources: ["https://guides.rubyonrails.org/8_0_release_notes.html", "https://api.rubyonrails.org/classes/ActionController/Parameters.html"]
---

## Mistake

```ruby
def user_params
  params.require(:user).permit(:name)
end
```

A request with `user=tampered` makes `require` return a string, so calling `permit` on it raises `NoMethodError` and the client gets HTTP 500.

## Correct

```ruby
def user_params
  params.expect(user: [:name])
end
```

The same request now returns HTTP 400. Valid requests behave the same as before.

## Why

Rails 8.0 added `params.expect` to replace `require` followed by `permit`. It checks the shape of the parameters and raises `ActionController::ParameterMissing` when they do not match, which Rails maps to a client error.

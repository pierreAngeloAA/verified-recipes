---
id: ruby-frozen-string-literal
title: Literals are frozen with the magic comment; dup before mutating
stack: ruby
applies_to: ">= 2.3"
tags: ["strings", "frozen", "rubocop"]
errors: ["can't modify frozen String"]
sources: ["https://docs.ruby-lang.org/en/master/syntax/comments_rdoc.html#label-frozen_string_literal+Directive"]
---

## Mistake

```ruby
# frozen_string_literal: true
out = ""
out << "line"
```

## Correct

```ruby
# frozen_string_literal: true
out = +""  # or String.new, "".dup
out << "line"
```

## Why

RuboCop adds the comment to every file. Ruby 3.4+ also warns (chilled strings) when mutating literals without it.

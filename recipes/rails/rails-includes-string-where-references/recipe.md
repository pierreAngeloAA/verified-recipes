---
id: rails-includes-string-where-references
title: includes + string conditions on the association need references
stack: rails
applies_to: ">= 8.0"
tags: ["activerecord", "eager-loading", "queries"]
errors: ["no such column: authors.name"]
sources: ["https://guides.rubyonrails.org/active_record_querying.html#specifying-conditions-on-eager-loaded-associations"]
---

## Mistake

```ruby
Article.includes(:author).where("authors.name = ?", name)
```

## Correct

```ruby
Article.includes(:author).where(authors: { name: name })  # hash: JOIN added
# or: .where("authors.name = ?", name).references(:author), or joins(:author)
```

## Why

With a SQL string Rails can't see the table, so it preloads in a separate query and the WHERE has no authors table. Message varies by database (PostgreSQL: missing FROM-clause entry).

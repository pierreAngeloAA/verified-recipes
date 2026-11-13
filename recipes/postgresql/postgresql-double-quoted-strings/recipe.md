---
id: postgresql-double-quoted-strings
title: String literals use single quotes; double quotes are identifiers
stack: postgresql
applies_to: ">= 13"
tags: ["sql", "mysql-migration", "quoting"]
errors: ["column \"Ada\" does not exist"]
sources: ["https://www.postgresql.org/docs/current/sql-syntax-lexical.html"]
---

## Mistake

```sql
SELECT * FROM users WHERE name = "Ada";
```

## Correct

```sql
SELECT * FROM users WHERE name = 'Ada';
```

## Why

Double quotes name columns/tables. Escape a quote by doubling it: 'O''Brien'.

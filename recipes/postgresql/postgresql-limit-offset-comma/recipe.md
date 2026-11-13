---
id: postgresql-limit-offset-comma
title: LIMIT offset, count is MySQL; use LIMIT ... OFFSET
stack: postgresql
applies_to: ">= 13"
tags: ["sql", "mysql-migration", "pagination"]
errors: ["LIMIT #,# syntax is not supported"]
sources: ["https://www.postgresql.org/docs/current/queries-limit.html"]
---

## Mistake

```sql
SELECT * FROM posts ORDER BY id LIMIT 20, 10;
```

## Correct

```sql
SELECT * FROM posts ORDER BY id LIMIT 10 OFFSET 20;
-- deep pages: WHERE id > :last_id ORDER BY id LIMIT 10 (keyset)
```

## Why

Without ORDER BY, page contents are not stable.

---
id: postgresql-timestamp-minus-integer
title: Subtract intervals from timestamps, not integers
stack: postgresql
applies_to: ">= 13"
tags: ["sql", "dates", "mysql-migration"]
errors: ["operator does not exist: timestamp with time zone - integer"]
sources: ["https://www.postgresql.org/docs/current/functions-datetime.html"]
---

## Mistake

```sql
SELECT * FROM events WHERE created_at > now() - 7;
```

## Correct

```sql
SELECT * FROM events WHERE created_at > now() - interval '7 days';
-- dynamic: now() - make_interval(days => $1)
```

## Why

Only date - integer means days; timestamps need an interval. DATE_SUB/DATE_ADD don't exist.

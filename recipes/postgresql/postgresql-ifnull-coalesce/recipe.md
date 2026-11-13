---
id: postgresql-ifnull-coalesce
title: IFNULL/NVL/ISNULL don't exist; use COALESCE
stack: postgresql
applies_to: ">= 13"
tags: ["sql", "functions", "mysql-migration", "null"]
errors: ["function ifnull(integer, integer) does not exist"]
sources: ["https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-COALESCE-NVL-IFNULL"]
---

## Mistake

```sql
SELECT IFNULL(discount, 0) FROM orders;
```

## Correct

```sql
SELECT COALESCE(discount, 0) FROM orders;
```

## Why

COALESCE is standard SQL and takes any number of arguments.

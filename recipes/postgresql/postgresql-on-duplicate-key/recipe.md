---
id: postgresql-on-duplicate-key
title: Upserts use ON CONFLICT, not ON DUPLICATE KEY UPDATE
stack: postgresql
applies_to: ">= 13"
tags: ["sql", "upsert", "mysql-migration"]
errors: ["syntax error at or near \"DUPLICATE\""]
sources: ["https://www.postgresql.org/docs/current/sql-insert.html#SQL-ON-CONFLICT"]
---

## Mistake

```sql
INSERT INTO stock (sku, qty) VALUES ('a', 1)
ON DUPLICATE KEY UPDATE qty = qty + 1;
```

## Correct

```sql
INSERT INTO stock (sku, qty) VALUES ('a', 1)
ON CONFLICT (sku) DO UPDATE SET qty = stock.qty + EXCLUDED.qty;
```

## Why

EXCLUDED is the row you tried to insert; the conflict target needs a unique index.

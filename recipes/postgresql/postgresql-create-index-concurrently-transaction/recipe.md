---
id: postgresql-create-index-concurrently-transaction
title: CREATE INDEX CONCURRENTLY can't run in a transaction
stack: postgresql
applies_to: ">= 13"
tags: ["sql", "indexes", "migrations", "locking"]
errors: ["CREATE INDEX CONCURRENTLY cannot run inside a transaction block"]
sources: ["https://www.postgresql.org/docs/current/sql-createindex.html#SQL-CREATEINDEX-CONCURRENTLY"]
---

## Mistake

```sql
BEGIN;
CREATE INDEX CONCURRENTLY orders_user_idx ON orders (user_id);
COMMIT;
```

## Correct

```sql
CREATE INDEX CONCURRENTLY IF NOT EXISTS orders_user_idx ON orders (user_id);
-- Rails: disable_ddl_transaction!  Django: atomic = False  Prisma/Flyway: own migration without tx
```

## Why

Migration tools wrap each file in a transaction by default. A failed build leaves an INVALID index to drop and retry.

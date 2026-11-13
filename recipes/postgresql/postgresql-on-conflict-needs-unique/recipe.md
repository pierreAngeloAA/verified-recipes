---
id: postgresql-on-conflict-needs-unique
title: ON CONFLICT (col) needs a unique index on col
stack: postgresql
applies_to: ">= 13"
tags: ["sql", "upsert", "indexes"]
errors: ["there is no unique or exclusion constraint matching the ON CONFLICT specification"]
sources: ["https://www.postgresql.org/docs/current/sql-insert.html#SQL-ON-CONFLICT"]
---

## Mistake

```sql
CREATE TABLE users (id int, email text);
INSERT INTO users VALUES (1, 'a@x') ON CONFLICT (email) DO NOTHING;
```

## Correct

```sql
ALTER TABLE users ADD CONSTRAINT users_email_key UNIQUE (email);
INSERT INTO users VALUES (1, 'a@x') ON CONFLICT (email) DO NOTHING;
```

## Why

Partial unique indexes need the same WHERE in the conflict target: ON CONFLICT (email) WHERE deleted_at IS NULL.

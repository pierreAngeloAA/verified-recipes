---
id: postgresql-identifier-case-folding
title: Unquoted names fold to lowercase; avoid quoted mixed case
stack: postgresql
applies_to: ">= 13"
tags: ["sql", "identifiers", "orm"]
errors: ["relation \"users\" does not exist"]
sources: ["https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS"]
---

## Mistake

```sql
CREATE TABLE "Users" ("firstName" text);
SELECT firstName FROM Users;
```

## Correct

```sql
CREATE TABLE users (first_name text);
SELECT first_name FROM users;
-- existing quoted names must always be quoted: SELECT "firstName" FROM "Users"
```

## Why

ORMs (Prisma, EF Core) often quote PascalCase/camelCase names, forcing quotes in every hand-written query.

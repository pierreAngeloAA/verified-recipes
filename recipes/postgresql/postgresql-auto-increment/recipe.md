---
id: postgresql-auto-increment
title: AUTO_INCREMENT is MySQL; use identity columns
stack: postgresql
applies_to: ">= 13"
tags: ["sql", "ddl", "mysql-migration", "identity"]
errors: ["syntax error at or near \"AUTO_INCREMENT\""]
sources: ["https://www.postgresql.org/docs/current/ddl-identity-columns.html"]
---

## Mistake

```sql
CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY);
```

## Correct

```sql
CREATE TABLE users (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY);
```

## Why

Identity columns (PG 10+) replace serial; ALWAYS rejects manual ids unless OVERRIDING SYSTEM VALUE.

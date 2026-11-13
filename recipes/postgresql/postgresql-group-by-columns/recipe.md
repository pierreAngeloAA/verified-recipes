---
id: postgresql-group-by-columns
title: Every selected non-aggregate column must be in GROUP BY
stack: postgresql
applies_to: ">= 13"
tags: ["sql", "aggregation", "mysql-migration"]
errors: ["column \"orders.id\" must appear in the GROUP BY clause or be used in an aggregate function"]
sources: ["https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-GROUP"]
---

## Mistake

```sql
SELECT customer_id, id, sum(total) FROM orders GROUP BY customer_id;
```

## Correct

```sql
SELECT customer_id, sum(total), max(id) AS last_id FROM orders GROUP BY customer_id;
-- one row per group: SELECT DISTINCT ON (customer_id) * FROM orders ORDER BY customer_id, id DESC
```

## Why

MySQL's loose mode picks an arbitrary row; PostgreSQL refuses. Grouping by a primary key allows that table's other columns.

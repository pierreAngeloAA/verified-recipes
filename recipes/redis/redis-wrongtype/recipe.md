---
id: redis-wrongtype
title: WRONGTYPE: a key holds one data type
stack: redis
applies_to: ">= 4.0"
tags: ["redis", "data-types", "keys"]
errors: ["WRONGTYPE Operation against a key holding the wrong kind of value"]
sources: ["https://redis.io/docs/latest/develop/data-types/"]
---

## Mistake

```python
r.set("events", "x")
r.lpush("events", "login")  # same key, different type
```

## Correct

```python
r.lpush("events:log", "login")  # separate keys per type
# check: r.type("events") -> b"string"
```

## Why

Common when a key name is reused across features or after a schema change; delete or rename the old key.

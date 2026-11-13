---
id: redis-hmset-deprecated
title: hmset is deprecated; use hset(mapping=)
stack: redis
applies_to: ">= 4.0"
tags: ["redis-py", "hashes", "deprecation"]
errors: ["Call to deprecated hmset. (Use 'hset' instead.)"]
sources: ["https://redis.readthedocs.io/en/stable/commands.html#redis.commands.core.CoreCommands.hset"]
---

## Mistake

```python
r.hmset("user:1", {"name": "Ada"})
```

## Correct

```python
r.hset("user:1", mapping={"name": "Ada"})
```

## Why

HMSET is deprecated since Redis 4; HSET accepts many fields.

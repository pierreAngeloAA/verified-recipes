---
id: redis-setex-argument-order
title: setex is (name, time, value) and deprecated; use set(ex=)
stack: redis
applies_to: ">= 4.0"
tags: ["redis-py", "ttl", "cache"]
errors: ["value is not an integer or out of range"]
sources: ["https://redis.readthedocs.io/en/stable/commands.html#redis.commands.core.CoreCommands.set"]
---

## Mistake

```python
r.setex("session", token, 3600)  # old redis-py 2 order
```

## Correct

```python
r.set("session", token, ex=3600)  # ex seconds, px ms, exat/pxat timestamps
```

## Why

redis-py 3 switched setex to (name, time, value); the old order sends the token as the TTL.

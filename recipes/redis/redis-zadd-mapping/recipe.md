---
id: redis-zadd-mapping
title: zadd takes a {member: score} mapping
stack: redis
applies_to: ">= 4.0"
tags: ["redis-py", "sorted-sets", "leaderboard"]
errors: ["'str' object has no attribute 'items'"]
sources: ["https://redis.readthedocs.io/en/stable/commands.html#redis.commands.core.CoreCommands.zadd"]
---

## Mistake

```python
r.zadd("board", "ada", 10)
```

## Correct

```python
r.zadd("board", {"ada": 10})
r.zincrby("board", 5, "ada")  # increment
```

## Why

redis-py 3 replaced the positional pairs with a mapping.

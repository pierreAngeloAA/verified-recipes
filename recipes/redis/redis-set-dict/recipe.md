---
id: redis-set-dict
title: redis-py doesn't serialize dicts; json.dumps them or use a hash
stack: redis
applies_to: ">= 4.0"
tags: ["redis-py", "serialization", "json"]
errors: ["Invalid input of type: 'dict'. Convert to a bytes, string, int or float first."]
sources: ["https://redis.readthedocs.io/en/stable/commands.html#redis.commands.core.CoreCommands.set"]
---

## Mistake

```python
r.set("user:1", {"name": "Ada"})
```

## Correct

```python
r.set("user:1", json.dumps({"name": "Ada"}))
# or a hash: r.hset("user:1", mapping={"name": "Ada"})
```

## Why

redis-py 3+ stopped calling str() on values, which used to store "{'name': 'Ada'}".

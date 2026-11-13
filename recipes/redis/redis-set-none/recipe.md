---
id: redis-set-none
title: None is not a valid Redis value
stack: redis
applies_to: ">= 4.0"
tags: ["redis-py", "null", "cache"]
errors: ["Invalid input of type: 'NoneType'. Convert to a bytes, string, int or float first."]
sources: ["https://redis.readthedocs.io/en/stable/commands.html#redis.commands.core.CoreCommands.set"]
---

## Mistake

```python
r.set(key, user.nickname)  # nickname may be None
```

## Correct

```python
if user.nickname is None:
    r.delete(key)
else:
    r.set(key, user.nickname)
# caching "not found": store a sentinel like "" or json.dumps(None)
```

## Why

Redis has no null; a missing key is the null. Note `r.get` returns None for missing keys.

---
id: redis-hset-mapping
title: Pass dicts to hset with mapping=
stack: redis
applies_to: ">= 4.0"
tags: ["redis-py", "hashes"]
errors: ["Invalid input of type: 'dict'. Convert to a bytes, string, int or float first."]
sources: ["https://redis.readthedocs.io/en/stable/commands.html#redis.commands.core.CoreCommands.hset"]
---

## Mistake

```python
r.hset("user:1", {"name": "Ada", "age": 36})
```

## Correct

```python
r.hset("user:1", mapping={"name": "Ada", "age": 36})
```

## Why

The positional form is hset(name, key, value). Nested values still need json.dumps.

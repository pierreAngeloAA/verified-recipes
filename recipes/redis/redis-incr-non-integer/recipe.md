---
id: redis-incr-non-integer
title: INCR works only on integer strings
stack: redis
applies_to: ">= 4.0"
tags: ["redis", "counters"]
errors: ["value is not an integer or out of range"]
sources: ["https://redis.io/docs/latest/commands/incr/"]
---

## Mistake

```python
r.set("views", "1.5")
r.incr("views")
```

## Correct

```python
r.incrbyfloat("price", 0.5)  # floats
r.incr("views")              # ints (key created as 0 if missing)
```

## Why

Values are strings; INCR parses a 64-bit integer. json.dumps'd numbers are fine, "1.0" is not.

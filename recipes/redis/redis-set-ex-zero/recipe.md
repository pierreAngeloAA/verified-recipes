---
id: redis-set-ex-zero
title: SET with ex=0 is an error; delete instead
stack: redis
applies_to: ">= 4.0"
tags: ["redis", "ttl", "cache"]
errors: ["invalid expire time in 'set' command"]
sources: ["https://redis.io/docs/latest/commands/set/"]
---

## Mistake

```python
ttl = int(expires_at - time.time())  # can be 0 or negative
r.set(key, value, ex=ttl)
```

## Correct

```python
ttl = int(expires_at - time.time())
if ttl > 0:
    r.set(key, value, ex=ttl)
else:
    r.delete(key)
# or absolute time: r.set(key, value, exat=int(expires_at))
```

## Why

EX must be positive. Computed TTLs hit 0 near expiry.

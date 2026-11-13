---
id: redis-decode-responses
title: Replies are bytes unless decode_responses=True
stack: redis
applies_to: ">= 4.0"
tags: ["redis-py", "bytes", "strings"]
errors: ["can't concat str to bytes"]
sources: ["https://redis.readthedocs.io/en/stable/connections.html#redis.Redis"]
---

## Mistake

```python
r = redis.Redis()
name = r.get("name") + "!"
if r.get("flag") == "on": ...  # always False
```

## Correct

```python
r = redis.Redis(decode_responses=True)
name = r.get("name") + "!"
```

## Why

Binary values (pickles, images) need a second client without decode_responses.

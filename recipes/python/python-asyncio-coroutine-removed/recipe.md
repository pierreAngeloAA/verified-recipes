---
id: python-asyncio-coroutine-removed
title: @asyncio.coroutine is removed; use async def
stack: python
applies_to: ">= 3.11"
tags: ["asyncio", "async", "migration"]
errors: ["module 'asyncio' has no attribute 'coroutine'"]
sources: ["https://docs.python.org/3/whatsnew/3.11.html"]
---

## Mistake

```python
@asyncio.coroutine
def fetch():
    yield from asyncio.sleep(1)
```

## Correct

```python
async def fetch():
    await asyncio.sleep(1)
```

## Why

Generator-based coroutines were removed in 3.11.

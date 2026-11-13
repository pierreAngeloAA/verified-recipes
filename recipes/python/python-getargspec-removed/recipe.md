---
id: python-getargspec-removed
title: inspect.getargspec is removed; use inspect.signature
stack: python
applies_to: ">= 3.11"
tags: ["inspect", "introspection", "migration"]
errors: ["module 'inspect' has no attribute 'getargspec'"]
sources: ["https://docs.python.org/3/whatsnew/3.11.html"]
---

## Mistake

```python
args = inspect.getargspec(f).args
```

## Correct

```python
args = list(inspect.signature(f).parameters)
```

## Why

Removed in 3.11. `signature` also handles keyword-only args and annotations; `getfullargspec` still exists.

---
id: python-collections-abc
title: ABCs live in collections.abc, not collections
stack: python
applies_to: ">= 3.10"
tags: ["collections", "typing", "migration"]
errors: ["module 'collections' has no attribute 'Mapping'"]
sources: ["https://docs.python.org/3/whatsnew/3.10.html"]
---

## Mistake

```python
isinstance(x, collections.Mapping)
```

## Correct

```python
from collections.abc import Mapping
isinstance(x, Mapping)
```

## Why

The aliases were removed in 3.10. Same for Iterable, Sequence, Callable, MutableMapping.

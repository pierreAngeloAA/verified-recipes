---
id: python-utcnow-deprecated
title: datetime.utcnow() is deprecated; use datetime.now(UTC)
stack: python
applies_to: ">= 3.12"
tags: ["datetime", "timezone", "deprecation"]
errors: ["datetime.datetime.utcnow() is deprecated"]
sources: ["https://docs.python.org/3/whatsnew/3.12.html"]
---

## Mistake

```python
now = datetime.utcnow()  # naive
ts = datetime.utcfromtimestamp(t)
```

## Correct

```python
from datetime import datetime, UTC
now = datetime.now(UTC)  # aware
ts = datetime.fromtimestamp(t, UTC)
```

## Why

Both return naive datetimes that compare and serialize as local time. Deprecated in 3.12.

---
id: python-imp-removed
title: imp is removed; use importlib
stack: python
applies_to: ">= 3.12"
tags: ["import", "migration"]
errors: ["No module named 'imp'"]
sources: ["https://docs.python.org/3/whatsnew/3.12.html"]
---

## Mistake

```python
import imp
mod = imp.load_source("cfg", path)
```

## Correct

```python
import importlib.util
spec = importlib.util.spec_from_file_location("cfg", path)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
```

## Why

`imp` was removed in 3.12. `importlib.reload(m)` replaces `imp.reload`.

---
id: langchain-pydantic-v1-removed
title: langchain_core.pydantic_v1 is gone; use pydantic v2 directly
stack: langchain
applies_to: ">= 1.0"
tags: ["python", "pydantic", "tools", "schema", "import"]
errors: ["No module named 'langchain_core.pydantic_v1'"]
sources: ["https://docs.langchain.com/oss/python/migrate/langchain-v1", "https://docs.langchain.com/oss/python/releases/langchain-v1"]
---

## Mistake

```python
from langchain_core.pydantic_v1 import BaseModel, Field
```

## Correct

```python
from pydantic import BaseModel, Field
```

## Why

LangChain runs on Pydantic 2, and the v1 shim was removed. Mixing v1 models into tools or `with_structured_output` fails.

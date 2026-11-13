---
id: langchain-schema-removed
title: langchain.schema is gone; import messages from langchain_core
stack: langchain
applies_to: ">= 1.0"
tags: ["python", "messages", "schema", "import", "langchain-core"]
errors: ["No module named 'langchain.schema'"]
sources: ["https://docs.langchain.com/oss/python/migrate/langchain-v1", "https://docs.langchain.com/oss/python/releases/langchain-v1"]
---

## Mistake

```python
from langchain.schema import HumanMessage, SystemMessage, Document
```

## Correct

```python
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from langchain_core.documents import Document
```

## Why

Core types live in `langchain-core`. Plain dicts such as `{"role": "user", "content": "hi"}` also work as messages.

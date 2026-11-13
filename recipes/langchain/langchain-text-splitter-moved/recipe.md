---
id: langchain-text-splitter-moved
title: Text splitters live in langchain-text-splitters
stack: langchain
applies_to: ">= 1.0"
tags: ["python", "text-splitter", "chunking", "rag", "import"]
errors: ["No module named 'langchain.text_splitter'"]
sources: ["https://docs.langchain.com/oss/python/migrate/langchain-v1", "https://docs.langchain.com/oss/python/releases/langchain-v1"]
---

## Mistake

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter
```

## Correct

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter  # pip install langchain-text-splitters
```

## Why

The splitters are a separate package. Loaders and vector stores moved too, to `langchain_community` or partner packages such as `langchain_chroma`.

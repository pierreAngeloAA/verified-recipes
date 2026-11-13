---
id: langchain-embeddings-import
title: Import embeddings from partner packages, not langchain.embeddings
stack: langchain
applies_to: ">= 1.0"
tags: ["python", "embeddings", "rag", "import", "partner-packages"]
errors: ["cannot import name 'OpenAIEmbeddings' from 'langchain.embeddings'"]
sources: ["https://docs.langchain.com/oss/python/migrate/langchain-v1", "https://docs.langchain.com/oss/python/releases/langchain-v1"]
---

## Mistake

```python
from langchain.embeddings import OpenAIEmbeddings
```

## Correct

```python
from langchain_openai import OpenAIEmbeddings
# or: from langchain.embeddings import init_embeddings
```

## Why

LangChain 1.0 keeps only `init_embeddings` in `langchain.embeddings`; provider classes live in partner packages.

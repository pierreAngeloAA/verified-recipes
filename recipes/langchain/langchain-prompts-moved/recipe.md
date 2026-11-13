---
id: langchain-prompts-moved
title: langchain.prompts is gone; import from langchain_core.prompts
stack: langchain
applies_to: ">= 1.0"
tags: ["python", "prompts", "prompt-template", "import"]
errors: ["No module named 'langchain.prompts'"]
sources: ["https://docs.langchain.com/oss/python/migrate/langchain-v1", "https://docs.langchain.com/oss/python/releases/langchain-v1"]
---

## Mistake

```python
from langchain.prompts import PromptTemplate, ChatPromptTemplate
```

## Correct

```python
from langchain_core.prompts import PromptTemplate, ChatPromptTemplate
```

## Why

LangChain 1.0 reduced the `langchain` package to agents, chat models, embeddings, messages, tools and middleware. Everything else comes from `langchain_core` or another package.

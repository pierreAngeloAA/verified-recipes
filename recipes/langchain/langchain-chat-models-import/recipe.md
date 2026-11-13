---
id: langchain-chat-models-import
title: Import chat models from partner packages, not langchain.chat_models
stack: langchain
applies_to: ">= 1.0"
tags: ["python", "import", "chatopenai", "chat-models", "partner-packages"]
errors: ["cannot import name 'ChatOpenAI' from 'langchain.chat_models'"]
sources: ["https://docs.langchain.com/oss/python/migrate/langchain-v1", "https://docs.langchain.com/oss/python/releases/langchain-v1"]
---

## Mistake

```python
from langchain.chat_models import ChatOpenAI
```

## Correct

```python
from langchain_openai import ChatOpenAI        # pip install langchain-openai
from langchain_anthropic import ChatAnthropic  # pip install langchain-anthropic
# or: from langchain.chat_models import init_chat_model
```

## Why

LangChain 1.0 keeps only `init_chat_model` in `langchain.chat_models`; provider classes live in `langchain-<provider>` packages.

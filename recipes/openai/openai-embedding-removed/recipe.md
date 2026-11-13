---
id: openai-embedding-removed
title: openai.Embedding.create is gone; use client.embeddings.create
stack: openai
applies_to: ">= 1.0"
tags: ["python", "embeddings", "migration", "v1", "rag"]
errors: ["You tried to access openai.Embedding, but this is no longer supported in openai>=1.0.0"]
sources: ["https://github.com/openai/openai-python", "https://platform.openai.com/docs/api-reference"]
---

## Mistake

```python
vec = openai.Embedding.create(model=m, input=text)["data"][0]["embedding"]
```

## Correct

```python
vec = client.embeddings.create(model=m, input=text).data[0].embedding
```

## Why

Removed in openai 1.0. The response is a typed object, so use attributes, not keys.

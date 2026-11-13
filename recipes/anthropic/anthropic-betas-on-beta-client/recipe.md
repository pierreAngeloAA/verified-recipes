---
id: anthropic-betas-on-beta-client
title: betas= only works on client.beta.messages
stack: anthropic
applies_to: ">= 1.0"
tags: ["python", "beta", "betas", "headers"]
errors: ["got an unexpected keyword argument 'betas'"]
sources: ["https://github.com/anthropics/anthropic-sdk-python", "https://platform.claude.com/docs/en/api/messages"]
---

## Mistake

```python
client.messages.create(..., betas=["context-management-2025-06-27"])
```

## Correct

```python
client.beta.messages.create(..., betas=["context-management-2025-06-27"])
```

## Why

Beta features live under `client.beta.*`, which adds the `anthropic-beta` header. Features out of beta, such as `client.files`, need neither.

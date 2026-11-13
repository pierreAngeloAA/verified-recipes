---
id: anthropic-prompt-caching-beta-removed
title: Prompt caching is GA; client.beta.prompt_caching is gone
stack: anthropic
applies_to: ">= 1.0"
tags: ["python", "prompt-caching", "cache-control", "beta", "cost"]
errors: ["'Beta' object has no attribute 'prompt_caching'"]
sources: ["https://github.com/anthropics/anthropic-sdk-python", "https://platform.claude.com/docs/en/api/messages"]
---

## Mistake

```python
client.beta.prompt_caching.messages.create(...)
```

## Correct

```python
client.messages.create(..., cache_control={"type": "ephemeral"})  # automatic breakpoint
# or {"cache_control": {"type": "ephemeral"}} on a system/tool/message block
```

## Why

Caching left beta, so it needs no namespace or header. Put stable content first; check `usage.cache_read_input_tokens` to confirm hits.

---
id: anthropic-completions-removed
title: client.completions is gone; use client.messages.create
stack: anthropic
applies_to: ">= 1.0"
tags: ["python", "completions", "messages", "migration", "claude"]
errors: ["'Anthropic' object has no attribute 'completions'"]
sources: ["https://github.com/anthropics/anthropic-sdk-python", "https://platform.claude.com/docs/en/api/messages"]
---

## Mistake

```python
client.completions.create(model=m, max_tokens_to_sample=1024, prompt="\n\nHuman: hi\n\nAssistant:")
```

## Correct

```python
r = client.messages.create(model=m, max_tokens=1024, messages=[{"role": "user", "content": "hi"}])
text = r.content[0].text
```

## Why

The Text Completions API was removed from the SDK in 1.0. Use the Messages API: `max_tokens` instead of `max_tokens_to_sample`, a `messages` list instead of a prompt string.

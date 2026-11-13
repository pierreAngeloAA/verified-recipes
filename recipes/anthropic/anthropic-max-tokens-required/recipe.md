---
id: anthropic-max-tokens-required
title: messages.create requires max_tokens, unlike OpenAI
stack: anthropic
applies_to: ">= 1.0"
tags: ["python", "max-tokens", "messages", "openai-migration"]
errors: ["Missing required arguments; Expected either ('max_tokens', 'messages' and 'model')"]
sources: ["https://github.com/anthropics/anthropic-sdk-python", "https://platform.claude.com/docs/en/api/messages"]
---

## Mistake

```python
client.messages.create(model=m, messages=msgs)
```

## Correct

```python
client.messages.create(model=m, max_tokens=16000, messages=msgs)
```

## Why

`max_tokens` is required. A low value truncates the reply (`stop_reason == "max_tokens"`): use about 16000 without streaming and up to 64000 with streaming.

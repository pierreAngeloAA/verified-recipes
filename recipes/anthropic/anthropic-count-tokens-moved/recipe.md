---
id: anthropic-count-tokens-moved
title: Count tokens with client.messages.count_tokens, not client.count_tokens
stack: anthropic
applies_to: ">= 1.0"
tags: ["python", "tokens", "count-tokens", "tokenizer"]
errors: ["'Anthropic' object has no attribute 'count_tokens'"]
sources: ["https://github.com/anthropics/anthropic-sdk-python", "https://platform.claude.com/docs/en/api/messages"]
---

## Mistake

```python
n = client.count_tokens("some text")  # local tokenizer, removed
```

## Correct

```python
n = client.messages.count_tokens(model=m, messages=msgs).input_tokens
```

## Why

Token counts depend on the model, so the API counts them; the local tokenizer was removed. Do not use `tiktoken` either, because it counts OpenAI tokens.

---
id: openai-chat-prompt-param
title: Chat completions take messages=, not prompt=
stack: openai
applies_to: ">= 1.0"
tags: ["python", "chat-completions", "prompt", "messages"]
errors: ["Missing required arguments; Expected either ('messages' and 'model')"]
sources: ["https://github.com/openai/openai-python", "https://platform.openai.com/docs/api-reference"]
---

## Mistake

```python
client.chat.completions.create(model=m, prompt="hi")
```

## Correct

```python
client.chat.completions.create(model=m, messages=[{"role": "user", "content": "hi"}])
# Responses API: client.responses.create(model=m, input="hi")
```

## Why

`prompt` belonged to the legacy Completions endpoint. Chat needs a list of role-tagged messages; the Responses API accepts a plain string as `input`.

---
id: openai-chatcompletion-removed
title: openai.ChatCompletion.create is gone; use client.chat.completions.create
stack: openai
applies_to: ">= 1.0"
tags: ["python", "chat-completions", "migration", "v1"]
errors: ["You tried to access openai.ChatCompletion, but this is no longer supported in openai>=1.0.0"]
sources: ["https://github.com/openai/openai-python", "https://platform.openai.com/docs/api-reference"]
---

## Mistake

```python
openai.ChatCompletion.create(model=m, messages=msgs)  # also openai.Completion
```

## Correct

```python
from openai import OpenAI
client = OpenAI()  # reads OPENAI_API_KEY
r = client.chat.completions.create(model=m, messages=msgs)
text = r.choices[0].message.content
```

## Why

openai 1.0 replaced the module-level resources with a client object. The same error appears for `Completion`, `Image`, `Moderation` and similar.

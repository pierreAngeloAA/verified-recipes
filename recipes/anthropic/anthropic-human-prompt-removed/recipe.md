---
id: anthropic-human-prompt-removed
title: HUMAN_PROMPT and AI_PROMPT no longer exist; send a messages list
stack: anthropic
applies_to: ">= 1.0"
tags: ["python", "prompt", "messages", "migration", "import"]
errors: ["cannot import name 'AI_PROMPT' from 'anthropic'"]
sources: ["https://github.com/anthropics/anthropic-sdk-python", "https://platform.claude.com/docs/en/api/messages"]
---

## Mistake

```python
from anthropic import HUMAN_PROMPT, AI_PROMPT
prompt = f"{HUMAN_PROMPT} hi{AI_PROMPT}"
```

## Correct

```python
messages = [{"role": "user", "content": "hi"}]  # alternate user/assistant turns
client.messages.create(model=m, max_tokens=1024, messages=messages)
```

## Why

The constants belonged to the removed Text Completions API. Turns are now role-tagged messages; instructions go in `system=`.

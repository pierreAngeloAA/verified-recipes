---
id: openai-response-not-subscriptable
title: Responses are objects: use .choices[0].message.content, not ['choices']
stack: openai
applies_to: ">= 1.0"
tags: ["python", "response", "pydantic", "dict"]
errors: ["'ChatCompletion' object is not subscriptable"]
sources: ["https://github.com/openai/openai-python", "https://platform.openai.com/docs/api-reference"]
---

## Mistake

```python
text = r["choices"][0]["message"]["content"]
```

## Correct

```python
text = r.choices[0].message.content
data = r.model_dump()  # if you need a dict
```

## Why

Since openai 1.0, responses are Pydantic models, not dicts.

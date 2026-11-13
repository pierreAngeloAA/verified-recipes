---
id: anthropic-temperature-removed
title: temperature, top_p and top_k are no longer accepted
stack: anthropic
applies_to: ">= 1.0"
tags: ["python", "temperature", "top-p", "sampling", "effort"]
errors: ["got an unexpected keyword argument 'temperature'"]
sources: ["https://github.com/anthropics/anthropic-sdk-python", "https://platform.claude.com/docs/en/api/messages"]
---

## Mistake

```python
client.messages.create(model=m, max_tokens=1024, temperature=0.2, messages=msgs)
```

## Correct

```python
client.messages.create(model=m, max_tokens=1024, messages=msgs,
                       output_config={"effort": "low"})  # optional
```

## Why

Sampling parameters were removed from the SDK, and API version `2026-10-21` rejects them on every model. Steer output through the prompt, and depth or cost through `output_config.effort`.

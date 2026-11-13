---
id: openai-responses-output-text
title: Responses API: read response.output_text, not output[0].content[0]
stack: openai
applies_to: ">= 1.0"
tags: ["python", "responses-api", "reasoning", "output"]
errors: ["'NoneType' object is not subscriptable"]
sources: ["https://github.com/openai/openai-python", "https://platform.openai.com/docs/api-reference"]
---

## Mistake

```python
text = r.output[0].content[0].text  # output[0] may be a reasoning item with content=None
```

## Correct

```python
text = r.output_text
```

## Why

With reasoning models `output` starts with `reasoning` items, and tool calls are separate items. `output_text` joins every text part.

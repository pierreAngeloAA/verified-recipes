---
id: anthropic-output-format-renamed
title: Structured outputs moved from output_format to output_config.format
stack: anthropic
applies_to: ">= 1.0"
tags: ["python", "structured-outputs", "json", "schema", "output-config"]
errors: ["got an unexpected keyword argument 'output_format'"]
sources: ["https://github.com/anthropics/anthropic-sdk-python", "https://platform.claude.com/docs/en/api/messages"]
---

## Mistake

```python
client.messages.create(..., output_format={"type": "json_schema", "schema": schema})
```

## Correct

```python
client.messages.create(..., output_config={"format": {"type": "json_schema", "schema": schema}})
# or client.messages.parse(...) to get a validated object
```

## Why

`output_format` was deprecated and then removed from the SDK. Effort and format now share `output_config`.

---
id: openai-tool-arguments-json-string
title: tool_call.function.arguments is a JSON string; parse it
stack: openai
applies_to: ">= 1.0"
tags: ["python", "tools", "function-calling", "json"]
errors: ["string indices must be integers"]
sources: ["https://github.com/openai/openai-python", "https://platform.openai.com/docs/api-reference"]
---

## Mistake

```python
city = tool_call.function.arguments["city"]
```

## Correct

```python
args = json.loads(tool_call.function.arguments)
city = args["city"]
```

## Why

The model returns the arguments as JSON text, which may also be invalid, so parse inside `try`. Return the result with `{"role": "tool", "tool_call_id": tool_call.id, "content": ...}`.

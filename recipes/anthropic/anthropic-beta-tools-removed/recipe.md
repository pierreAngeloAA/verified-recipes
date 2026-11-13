---
id: anthropic-beta-tools-removed
title: Tool use is GA; client.beta.tools is gone
stack: anthropic
applies_to: ">= 1.0"
tags: ["python", "tool-use", "function-calling", "tools", "beta"]
errors: ["'Beta' object has no attribute 'tools'"]
sources: ["https://github.com/anthropics/anthropic-sdk-python", "https://platform.claude.com/docs/en/api/messages"]
---

## Mistake

```python
client.beta.tools.messages.create(..., tools=[tool])
```

## Correct

```python
client.messages.create(..., tools=[{"name": "get_weather", "description": "...",
                                    "input_schema": {...}}])
```

## Why

Tools are a normal Messages API parameter. Loop while `stop_reason == "tool_use"` and send every `tool_result` in one user message, or use `client.beta.messages.tool_runner`.

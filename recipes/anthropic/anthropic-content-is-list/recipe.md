---
id: anthropic-content-is-list
title: response.content is a list of blocks, not a string
stack: anthropic
applies_to: ">= 1.0"
tags: ["python", "response", "content-blocks", "text"]
errors: ["'list' object has no attribute 'strip'"]
sources: ["https://github.com/anthropics/anthropic-sdk-python", "https://platform.claude.com/docs/en/api/messages"]
---

## Mistake

```python
text = response.content.strip()  # or response.completion
```

## Correct

```python
text = "".join(b.text for b in response.content if b.type == "text")
```

## Why

A reply can mix `text`, `thinking` and `tool_use` blocks, so `content[0]` is not always text. Check `stop_reason` first.

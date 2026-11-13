---
id: openai-stream-delta-none
title: Streamed delta.content can be None; guard before joining
stack: openai
applies_to: ">= 1.0"
tags: ["python", "streaming", "stream", "delta", "sse"]
errors: ["expected str instance, NoneType found"]
sources: ["https://github.com/openai/openai-python", "https://platform.openai.com/docs/api-reference"]
---

## Mistake

```python
text = "".join(c.choices[0].delta.content for c in stream)
```

## Correct

```python
text = "".join(c.choices[0].delta.content or "" for c in stream if c.choices)
```

## Why

The last chunk, and chunks that carry only tool calls, have `content=None`. With `stream_options={"include_usage": True}` the final chunk has empty `choices`.

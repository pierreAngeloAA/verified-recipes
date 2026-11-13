---
id: openai-async-missing-await
title: AsyncOpenAI calls must be awaited
stack: openai
applies_to: ">= 1.0"
tags: ["python", "async", "asyncio", "await", "coroutine"]
errors: ["'coroutine' object has no attribute 'choices'"]
sources: ["https://github.com/openai/openai-python", "https://platform.openai.com/docs/api-reference"]
---

## Mistake

```python
client = AsyncOpenAI()
r = client.chat.completions.create(model=m, messages=msgs)
r.choices
```

## Correct

```python
r = await client.chat.completions.create(model=m, messages=msgs)
# many calls in parallel: await asyncio.gather(*calls)
```

## Why

Every method of `AsyncOpenAI` returns a coroutine. Use `OpenAI` in synchronous code.

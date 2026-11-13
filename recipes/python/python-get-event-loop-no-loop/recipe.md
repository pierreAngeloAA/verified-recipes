---
id: python-get-event-loop-no-loop
title: asyncio.get_event_loop() fails when no loop is running
stack: python
applies_to: ">= 3.12"
tags: ["asyncio", "async", "event-loop"]
errors: ["There is no current event loop"]
sources: ["https://docs.python.org/3/library/asyncio-eventloop.html#asyncio.get_event_loop"]
---

## Mistake

```python
loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```

## Correct

```python
asyncio.run(main())
# inside a coroutine: asyncio.get_running_loop()
```

## Why

Deprecated in 3.12 and a RuntimeError in 3.14 when called outside a running loop.

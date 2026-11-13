---
id: mcp-get-context-removed
title: get_context() is gone; declare a ctx: Context parameter
stack: mcp
applies_to: ">= 2.0"
tags: ["python", "context", "mcpserver", "tool", "logging"]
errors: ["'MCPServer' object has no attribute 'get_context'"]
sources: ["https://py.sdk.modelcontextprotocol.io/v2/migration/", "https://github.com/modelcontextprotocol/python-sdk"]
---

## Mistake

```python
@mcp.tool()
async def work() -> str:
    ctx = mcp.get_context()
```

## Correct

```python
@mcp.tool()
async def work(ctx: Context) -> str:  # injected, hidden from the schema
    await ctx.info({"message": "started"})
    return "ok"
```

## Why

Removed in mcp 2.0. Context logging also changed: `message=` became `data=`, and `extra=` was removed.

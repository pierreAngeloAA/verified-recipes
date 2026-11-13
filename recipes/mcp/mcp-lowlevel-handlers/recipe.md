---
id: mcp-lowlevel-handlers
title: Low-level Server takes on_* handlers, not decorators
stack: mcp
applies_to: ">= 2.0"
tags: ["python", "lowlevel", "server", "handlers", "decorator"]
errors: ["'Server' object has no attribute 'list_tools'"]
sources: ["https://py.sdk.modelcontextprotocol.io/v2/migration/", "https://github.com/modelcontextprotocol/python-sdk"]
---

## Mistake

```python
server = Server("demo")

@server.list_tools()
async def list_tools(): return [...]
```

## Correct

```python
async def list_tools(ctx, params) -> ListToolsResult:
    return ListToolsResult(tools=[...])

server = Server("demo", on_list_tools=list_tools, on_call_tool=call_tool)
```

## Why

mcp 2.0 replaced the decorators with keyword-only `on_*` constructor arguments, and handlers return full result types. Prefer `MCPServer` unless you need the low level.

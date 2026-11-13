---
id: mcp-tool-decorator-call
title: Use @server.tool() with parentheses
stack: mcp
applies_to: ">= 2.0"
tags: ["python", "decorator", "tool", "mcpserver"]
errors: ["Use @tool() instead of @tool"]
sources: ["https://py.sdk.modelcontextprotocol.io/v2/migration/", "https://github.com/modelcontextprotocol/python-sdk"]
---

## Mistake

```python
@server.tool
def echo(text: str) -> str: ...
```

## Correct

```python
@server.tool()  # also @server.resource("uri://..."), @server.prompt()
def echo(text: str) -> str:
    """Docstring becomes the tool description."""
    return text
```

## Why

`tool()` is a decorator factory that takes optional `name`, `description` and `annotations`. The schema comes from the type hints.

---
id: mcp-mcperror-renamed
title: McpError became MCPError(code, message)
stack: mcp
applies_to: ">= 2.0"
tags: ["python", "errors", "exceptions", "mcperror"]
errors: ["cannot import name 'McpError' from 'mcp.shared.exceptions'"]
sources: ["https://py.sdk.modelcontextprotocol.io/v2/migration/", "https://github.com/modelcontextprotocol/python-sdk"]
---

## Mistake

```python
from mcp.shared.exceptions import McpError
raise McpError(ErrorData(code=c, message=m))
except McpError as e: e.error.message
```

## Correct

```python
from mcp.shared.exceptions import MCPError
raise MCPError(c, m)
except MCPError as e: e.message
```

## Why

Renamed in mcp 2.0. A tool that raises `MCPError` now produces a JSON-RPC error rather than a result with `is_error=True`.

---
id: mcp-fastmcp-renamed
title: FastMCP was renamed to MCPServer
stack: mcp
applies_to: ">= 2.0"
tags: ["python", "fastmcp", "mcpserver", "server", "import", "migration"]
errors: ["No module named 'mcp.server.fastmcp'"]
sources: ["https://py.sdk.modelcontextprotocol.io/v2/migration/", "https://github.com/modelcontextprotocol/python-sdk"]
---

## Mistake

```python
from mcp.server.fastmcp import FastMCP, Context
mcp = FastMCP("demo")
```

## Correct

```python
from mcp.server.mcpserver import MCPServer, Context
mcp = MCPServer("demo")

@mcp.tool()
def add(a: int, b: int) -> int:
    return a + b

mcp.run()  # stdio
```

## Why

Renamed in mcp 2.0, along with `ctx.fastmcp` to `ctx.mcp_server` and `FastMCPError` to `MCPServerError`. To stay on the old API, pin `mcp<2`.

---
id: mcp-transport-args-in-run
title: host and port go to run(), not the MCPServer constructor
stack: mcp
applies_to: ">= 2.0"
tags: ["python", "mcpserver", "http", "streamable-http", "port", "host"]
errors: ["MCPServer.__init__() got an unexpected keyword argument 'port'"]
sources: ["https://py.sdk.modelcontextprotocol.io/v2/migration/", "https://github.com/modelcontextprotocol/python-sdk"]
---

## Mistake

```python
mcp = MCPServer("demo", host="0.0.0.0", port=9000)
mcp.run(transport="streamable-http")
```

## Correct

```python
mcp = MCPServer("demo")
mcp.run(transport="streamable-http", host="0.0.0.0", port=9000)
```

## Why

In mcp 2.0 transport options moved to `run()` and the app methods: `host`, `port`, `streamable_http_path`, `json_response`, `stateless_http` and others. `MCP_*` environment variables are no longer read.

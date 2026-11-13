---
id: mcp-snake-case-fields
title: MCP type fields are snake_case: is_error, input_schema, next_cursor
stack: mcp
applies_to: ">= 2.0"
tags: ["python", "types", "snake-case", "camelcase", "pydantic"]
errors: ["'CallToolResult' object has no attribute 'isError'"]
sources: ["https://py.sdk.modelcontextprotocol.io/v2/migration/", "https://github.com/modelcontextprotocol/python-sdk"]
---

## Mistake

```python
if result.isError: ...
schema = tool.inputSchema
```

## Correct

```python
if result.is_error: ...
schema = tool.input_schema
wire = result.model_dump(by_alias=True)  # camelCase JSON keys
```

## Why

mcp 2.0 renamed the attributes to snake_case: `outputSchema`, `structuredContent`, `nextCursor`, `mimeType`, `serverInfo`, `protocolVersion`, `uriTemplate`, `progressToken` and others. The wire format is still camelCase.

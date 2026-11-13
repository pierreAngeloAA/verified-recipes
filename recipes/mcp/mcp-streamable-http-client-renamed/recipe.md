---
id: mcp-streamable-http-client-renamed
title: streamablehttp_client was replaced by streamable_http_client
stack: mcp
applies_to: ">= 2.0"
tags: ["python", "client", "streamable-http", "transport", "import"]
errors: ["cannot import name 'streamablehttp_client'"]
sources: ["https://py.sdk.modelcontextprotocol.io/v2/migration/", "https://github.com/modelcontextprotocol/python-sdk"]
---

## Mistake

```python
from mcp.client.streamable_http import streamablehttp_client
```

## Correct

```python
from mcp.client.streamable_http import streamable_http_client
# or the high-level client: from mcp import Client
```

## Why

Removed in mcp 2.0 together with `get_session_id` and the WebSocket transport.

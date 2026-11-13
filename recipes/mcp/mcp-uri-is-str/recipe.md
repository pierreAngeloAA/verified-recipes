---
id: mcp-uri-is-str
title: Resource uri fields are plain str, not AnyUrl
stack: mcp
applies_to: ">= 2.0"
tags: ["python", "resources", "uri", "anyurl", "pydantic"]
errors: ["'str' object has no attribute 'host'"]
sources: ["https://py.sdk.modelcontextprotocol.io/v2/migration/", "https://github.com/modelcontextprotocol/python-sdk"]
---

## Mistake

```python
host = resource.uri.host
```

## Correct

```python
from urllib.parse import urlparse
host = urlparse(resource.uri).hostname
```

## Why

In mcp 2.0 `uri` fields are `str`. Pass `str(...)` when you build them from `AnyUrl` values.

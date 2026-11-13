---
id: mcp-content-type-renamed
title: mcp.types.Content became ContentBlock
stack: mcp
applies_to: ">= 2.0"
tags: ["python", "types", "content", "import"]
errors: ["cannot import name 'Content' from 'mcp.types'"]
sources: ["https://py.sdk.modelcontextprotocol.io/v2/migration/", "https://github.com/modelcontextprotocol/python-sdk"]
---

## Mistake

```python
from mcp.types import Content, ResourceReference, Cursor
```

## Correct

```python
from mcp.types import ContentBlock, ResourceTemplateReference
```

## Why

Removed in mcp 2.0; `Cursor` has no replacement. `mcp.types` is now an alias of the `mcp-types` package.

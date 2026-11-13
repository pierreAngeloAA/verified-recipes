---
id: python-ssl-wrap-socket-removed
title: ssl.wrap_socket is removed; use an SSLContext
stack: python
applies_to: ">= 3.12"
tags: ["ssl", "tls", "security", "migration"]
errors: ["module 'ssl' has no attribute 'wrap_socket'"]
sources: ["https://docs.python.org/3/whatsnew/3.12.html"]
---

## Mistake

```python
tls = ssl.wrap_socket(sock)
```

## Correct

```python
ctx = ssl.create_default_context()
tls = ctx.wrap_socket(sock, server_hostname=host)
```

## Why

Removed in 3.12. It never checked the certificate or hostname; `create_default_context()` does both.

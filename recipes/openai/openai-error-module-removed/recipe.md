---
id: openai-error-module-removed
title: openai.error is gone; exceptions live on the openai module
stack: openai
applies_to: ">= 1.0"
tags: ["python", "errors", "exceptions", "retry", "rate-limit"]
errors: ["module 'openai' has no attribute 'error'"]
sources: ["https://github.com/openai/openai-python", "https://platform.openai.com/docs/api-reference"]
---

## Mistake

```python
except openai.error.RateLimitError: ...
```

## Correct

```python
except openai.RateLimitError: ...      # 429
except openai.APIStatusError as e: ... # e.status_code
except openai.APIConnectionError: ...
```

## Why

openai 1.0 moved the exceptions to the top level. The client already retries 429 and 5xx twice by default (`max_retries`).

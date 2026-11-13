---
id: openai-embeddings-utils-removed
title: openai.embeddings_utils is gone; compute cosine similarity yourself
stack: openai
applies_to: ">= 1.0"
tags: ["python", "embeddings", "cosine-similarity", "rag", "import"]
errors: ["No module named 'openai.embeddings_utils'"]
sources: ["https://github.com/openai/openai-python", "https://platform.openai.com/docs/api-reference"]
---

## Mistake

```python
from openai.embeddings_utils import cosine_similarity, get_embedding
```

## Correct

```python
import math
def cosine(a, b):
    return sum(x * y for x, y in zip(a, b)) / (math.hypot(*a) * math.hypot(*b))
# or numpy: a @ b / (norm(a) * norm(b))
```

## Why

The helpers were removed in openai 1.0. OpenAI embeddings are already normalized, so the dot product gives the same ranking.

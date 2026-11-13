---
id: langchain-predict-removed
title: predict, run and calling the model are gone; use invoke
stack: langchain
applies_to: ">= 1.0"
tags: ["python", "invoke", "predict", "run", "runnable"]
errors: ["object has no attribute 'predict'"]
sources: ["https://docs.langchain.com/oss/python/migrate/langchain-v1", "https://docs.langchain.com/oss/python/releases/langchain-v1"]
---

## Mistake

```python
llm.predict("hi")   # also llm("hi"), chain.run(...), chain(...)
```

## Correct

```python
llm.invoke("hi").content
llm.batch(["a", "b"])  # several inputs
for chunk in llm.stream("hi"): ...
# async: await llm.ainvoke("hi")
```

## Why

Every runnable in LangChain 1.0 uses the `invoke`, `batch` and `stream` interface; the old call styles were removed.

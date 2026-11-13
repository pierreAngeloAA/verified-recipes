---
id: langchain-llmchain-removed
title: LLMChain is gone; compose prompt | model | parser
stack: langchain
applies_to: ">= 1.0"
tags: ["python", "llmchain", "chains", "lcel", "runnable"]
errors: ["No module named 'langchain.chains'"]
sources: ["https://docs.langchain.com/oss/python/migrate/langchain-v1", "https://docs.langchain.com/oss/python/releases/langchain-v1"]
---

## Mistake

```python
from langchain.chains import LLMChain
chain = LLMChain(llm=llm, prompt=prompt)
chain.run(country="France")
```

## Correct

```python
chain = prompt | llm | StrOutputParser()
chain.invoke({"country": "France"})
```

## Why

LangChain 1.0 removed the legacy chains. They survive only in `langchain-classic`; prefer LCEL runnables or `create_agent`.

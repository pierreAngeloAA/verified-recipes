---
id: langchain-memory-removed
title: langchain.memory is gone; persist history with a checkpointer
stack: langchain
applies_to: ">= 1.0"
tags: ["python", "memory", "history", "checkpointer", "conversation"]
errors: ["No module named 'langchain.memory'"]
sources: ["https://docs.langchain.com/oss/python/migrate/langchain-v1", "https://docs.langchain.com/oss/python/releases/langchain-v1"]
---

## Mistake

```python
from langchain.memory import ConversationBufferMemory
```

## Correct

```python
from langgraph.checkpoint.memory import InMemorySaver
agent = create_agent(model=m, tools=tools, checkpointer=InMemorySaver())
cfg = {"configurable": {"thread_id": "user-1"}}
agent.invoke({"messages": [{"role": "user", "content": "hi"}]}, cfg)  # history is kept per thread
```

## Why

LangChain 1.0 removed the memory classes. Short-term memory is the agent state saved by a LangGraph checkpointer; use a database-backed saver in production.

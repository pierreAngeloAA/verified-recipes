---
id: langchain-initialize-agent-removed
title: initialize_agent and AgentExecutor are gone; use create_agent
stack: langchain
applies_to: ">= 1.0"
tags: ["python", "agents", "create-agent", "agentexecutor", "langgraph"]
errors: ["cannot import name 'AgentExecutor' from 'langchain.agents'"]
sources: ["https://docs.langchain.com/oss/python/migrate/langchain-v1", "https://docs.langchain.com/oss/python/releases/langchain-v1"]
---

## Mistake

```python
from langchain.agents import initialize_agent, AgentExecutor
agent = initialize_agent(tools, llm, agent="zero-shot-react-description")
```

## Correct

```python
from langchain.agents import create_agent
agent = create_agent(model=llm, tools=tools, system_prompt="...")
agent.invoke({"messages": [{"role": "user", "content": "hi"}]})
```

## Why

LangChain 1.0 replaced the agent types with `create_agent`, which runs on LangGraph. `langgraph.prebuilt.create_react_agent` is deprecated too.

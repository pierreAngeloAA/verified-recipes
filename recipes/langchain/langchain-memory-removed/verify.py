from support import check

def fake(*replies):
    from langchain_core.language_models import GenericFakeChatModel
    from langchain_core.messages import AIMessage
    return GenericFakeChatModel(messages=iter([AIMessage(r) for r in replies]))

def correct():
    from langchain.agents import create_agent
    from langgraph.checkpoint.memory import InMemorySaver
    agent = create_agent(model=fake("one", "two"), tools=[], checkpointer=InMemorySaver())
    config = {"configurable": {"thread_id": "t1"}}
    agent.invoke({"messages": [{"role": "user", "content": "a"}]}, config)
    assert len(agent.invoke({"messages": [{"role": "user", "content": "b"}]}, config)["messages"]) == 4

def mistake():
    from langchain.memory import ConversationBufferMemory  # noqa: F401

check(__file__, correct, mistake)

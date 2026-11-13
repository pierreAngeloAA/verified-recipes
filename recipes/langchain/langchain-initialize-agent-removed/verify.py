from support import check

def fake(*replies):
    from langchain_core.language_models import GenericFakeChatModel
    from langchain_core.messages import AIMessage
    return GenericFakeChatModel(messages=iter([AIMessage(r) for r in replies]))

def correct():
    from langchain.agents import create_agent
    agent = create_agent(model=fake("done"), tools=[], system_prompt="Be brief.")
    assert agent.invoke({"messages": [{"role": "user", "content": "hi"}]})["messages"][-1].content == "done"

def mistake():
    from langchain.agents import AgentExecutor, initialize_agent  # noqa: F401

check(__file__, correct, mistake)

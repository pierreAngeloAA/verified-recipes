from support import check

def correct():
    from langchain_core.messages import HumanMessage, SystemMessage
    assert HumanMessage("hi").type == "human" and SystemMessage("x").type == "system"

def mistake():
    from langchain.schema import HumanMessage  # noqa: F401

check(__file__, correct, mistake)

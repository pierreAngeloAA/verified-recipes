from support import check

def fake(*replies):
    from langchain_core.language_models import GenericFakeChatModel
    from langchain_core.messages import AIMessage
    return GenericFakeChatModel(messages=iter([AIMessage(r) for r in replies]))

def correct():
    assert fake("Paris").invoke("Capital of France?").content == "Paris"

def mistake():
    fake("Paris").predict("Capital of France?")

check(__file__, correct, mistake)

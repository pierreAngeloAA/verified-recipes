from support import check

def fake(*replies):
    from langchain_core.language_models import GenericFakeChatModel
    from langchain_core.messages import AIMessage
    return GenericFakeChatModel(messages=iter([AIMessage(r) for r in replies]))

def correct():
    from langchain_core.output_parsers import StrOutputParser
    from langchain_core.prompts import ChatPromptTemplate
    chain = ChatPromptTemplate.from_template("Capital of {country}?") | fake("Paris") | StrOutputParser()
    assert chain.invoke({"country": "France"}) == "Paris"

def mistake():
    from langchain.chains import LLMChain  # noqa: F401

check(__file__, correct, mistake)

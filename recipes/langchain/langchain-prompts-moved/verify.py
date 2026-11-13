from support import check

def correct():
    from langchain_core.prompts import ChatPromptTemplate
    assert ChatPromptTemplate.from_template("Hi {name}").invoke({"name": "Ana"}).to_string() == "Human: Hi Ana"

def mistake():
    from langchain.prompts import ChatPromptTemplate  # noqa: F401

check(__file__, correct, mistake)

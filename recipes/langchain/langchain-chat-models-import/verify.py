from support import check

def correct():
    from langchain_openai import ChatOpenAI
    ChatOpenAI(model="gpt-test", api_key="test")

def mistake():
    from langchain.chat_models import ChatOpenAI  # noqa: F401

check(__file__, correct, mistake)

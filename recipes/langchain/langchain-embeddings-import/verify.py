from support import check

def correct():
    from langchain_openai import OpenAIEmbeddings
    OpenAIEmbeddings(model="emb-test", api_key="test")

def mistake():
    from langchain.embeddings import OpenAIEmbeddings  # noqa: F401

check(__file__, correct, mistake)

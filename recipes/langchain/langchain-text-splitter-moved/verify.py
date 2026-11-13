from support import check

def correct():
    from langchain_text_splitters import RecursiveCharacterTextSplitter
    assert len(RecursiveCharacterTextSplitter(chunk_size=10, chunk_overlap=0).split_text("word " * 10)) > 1

def mistake():
    from langchain.text_splitter import RecursiveCharacterTextSplitter  # noqa: F401

check(__file__, correct, mistake)

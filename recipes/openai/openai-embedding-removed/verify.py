from support import check, openai_client

EMB = {"object": "list", "model": "emb-test", "data": [{"object": "embedding", "index": 0, "embedding": [0.1, 0.2]}], "usage": {"prompt_tokens": 1, "total_tokens": 1}}

def correct():
    assert openai_client(EMB).embeddings.create(model="emb-test", input="hi").data[0].embedding == [0.1, 0.2]

def mistake():
    import openai
    openai.Embedding.create(model="emb-test", input="hi")

check(__file__, correct, mistake)

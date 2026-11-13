from support import check

def correct():
    import openai
    assert issubclass(openai.RateLimitError, openai.APIStatusError)

def mistake():
    import openai
    openai.error.RateLimitError

check(__file__, correct, mistake)

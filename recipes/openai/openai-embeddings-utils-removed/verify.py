import math
from support import check

def cosine(a, b):
    return sum(x * y for x, y in zip(a, b)) / (math.hypot(*a) * math.hypot(*b))

def correct():
    assert round(cosine([1, 0], [1, 0]), 6) == 1.0

def mistake():
    from openai.embeddings_utils import cosine_similarity  # noqa: F401

check(__file__, correct, mistake)

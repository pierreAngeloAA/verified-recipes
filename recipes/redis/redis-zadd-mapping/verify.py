import redis
from support import check, redis_client

r = redis_client()
def correct():
    r.zadd("board", {"ada": 10})
    assert r.zscore("board", "ada") == 10.0

def mistake():
    r.zadd("board", "ada", 10)

check(__file__, correct, mistake)

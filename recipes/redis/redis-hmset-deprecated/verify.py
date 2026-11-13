import redis
from support import check, redis_client

r = redis_client()
import warnings

def correct():
    with warnings.catch_warnings():
        warnings.simplefilter("error")
        r.hset("user:1", mapping={"name": "Ada"})

def mistake():
    with warnings.catch_warnings():
        warnings.simplefilter("error")
        r.hmset("user:1", {"name": "Ada"})

check(__file__, correct, mistake)

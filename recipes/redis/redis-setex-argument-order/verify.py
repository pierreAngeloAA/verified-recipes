import redis
from support import check, redis_client

r = redis_client()
import warnings

def correct():
    r.set("session", "tok", ex=3600)
    assert 0 < r.ttl("session") <= 3600

def mistake():
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", DeprecationWarning)
        r.setex("session", "tok", 3600)

check(__file__, correct, mistake)

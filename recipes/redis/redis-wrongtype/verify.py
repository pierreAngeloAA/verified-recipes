import redis
from support import check, redis_client

r = redis_client()
def correct():
    r.set("events", "x")
    r.lpush("events:log", "login")
    assert r.type("events") == b"string" and r.llen("events:log") == 1

def mistake():
    r.set("events", "x")
    r.lpush("events", "login")

check(__file__, correct, mistake)

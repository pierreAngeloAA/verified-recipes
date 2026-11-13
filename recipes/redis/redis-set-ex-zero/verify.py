import redis
from support import check, redis_client

r = redis_client()
def correct():
    ttl = 0
    if ttl > 0:
        r.set("k", "v", ex=ttl)
    else:
        r.delete("k")
    assert r.get("k") is None

def mistake():
    r.set("k", "v", ex=0)

check(__file__, correct, mistake)

import redis
from support import check, redis_client

r = redis_client()
def correct():
    r.set("price", "1.5")
    assert float(r.incrbyfloat("price", 0.5)) == 2.0
    assert r.incr("views") == 1

def mistake():
    r.set("views", "1.5")
    r.incr("views")

check(__file__, correct, mistake)

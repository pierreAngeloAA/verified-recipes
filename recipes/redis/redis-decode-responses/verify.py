import redis
from support import check, redis_client

r = redis_client()
def correct():
    s = redis.Redis(connection_pool=redis.ConnectionPool(port=r.connection_pool.connection_kwargs["port"], decode_responses=True))
    s.set("name", "Ada")
    assert s.get("name") + "!" == "Ada!"

def mistake():
    r.set("name", "Ada")
    r.get("name") + "!"

check(__file__, correct, mistake)

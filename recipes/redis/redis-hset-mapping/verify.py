import redis
from support import check, redis_client

r = redis_client()
def correct():
    r.hset("user:1", mapping={"name": "Ada", "age": 36})
    assert r.hgetall("user:1") == {b"name": b"Ada", b"age": b"36"}

def mistake():
    r.hset("user:1", {"name": "Ada", "age": 36})

check(__file__, correct, mistake)

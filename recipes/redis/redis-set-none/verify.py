import redis
from support import check, redis_client

r = redis_client()
def correct():
    nickname = None
    if nickname is None:
        r.delete("nick")
    else:
        r.set("nick", nickname)
    assert r.get("nick") is None

def mistake():
    r.set("nick", None)

check(__file__, correct, mistake)

import redis
from support import check, redis_client

r = redis_client()
import json

def correct():
    r.set("user:1", json.dumps({"name": "Ada"}))
    assert json.loads(r.get("user:1")) == {"name": "Ada"}

def mistake():
    r.set("user:1", {"name": "Ada"})

check(__file__, correct, mistake)

from support import check
from datetime import datetime, UTC

def correct():
    assert datetime.now(UTC).tzinfo is UTC and datetime.fromtimestamp(0, UTC).year == 1970

def mistake():
    datetime.utcnow()

check(__file__, correct, mistake)

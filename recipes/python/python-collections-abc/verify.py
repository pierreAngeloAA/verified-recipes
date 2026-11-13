from support import check
import collections

def correct():
    from collections.abc import Mapping
    assert isinstance({}, Mapping)

def mistake():
    isinstance({}, collections.Mapping)

check(__file__, correct, mistake)

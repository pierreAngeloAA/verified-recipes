from support import check
import inspect

def f(a, b=1): pass

def correct():
    assert list(inspect.signature(f).parameters) == ["a", "b"]

def mistake():
    inspect.getargspec(f)

check(__file__, correct, mistake)

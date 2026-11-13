from support import check
import unittest

class T(unittest.TestCase):
    def runTest(self): pass

def correct():
    T().assertEqual(1, 1)

def mistake():
    T().assertEquals(1, 1)

check(__file__, correct, mistake)

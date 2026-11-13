from support import check
import sys
DIGITS = "9" * 5000

def correct():
    old = sys.get_int_max_str_digits(); sys.set_int_max_str_digits(0)
    try:
        assert int(DIGITS) % 10 == 9
    finally:
        sys.set_int_max_str_digits(old)

def mistake():
    int(DIGITS)

check(__file__, correct, mistake)

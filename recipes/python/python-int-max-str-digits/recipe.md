---
id: python-int-max-str-digits
title: int() rejects strings over 4300 digits
stack: python
applies_to: ">= 3.11"
tags: ["int", "parsing", "limits", "bigint"]
errors: ["Exceeds the limit (4300 digits) for integer string conversion"]
sources: ["https://docs.python.org/3/library/stdtypes.html#int-max-str-digits"]
---

## Mistake

```python
n = int(huge_digits)  # ValueError
s = str(huge_int)    # ValueError
```

## Correct

```python
import sys
sys.set_int_max_str_digits(0)  # 0 = no limit; or a bigger cap
n = int(huge_digits)
```

## Why

A guard against quadratic-time DoS, also hit by `str(n)` and `json` on huge ints. Hex/binary strings are exempt.

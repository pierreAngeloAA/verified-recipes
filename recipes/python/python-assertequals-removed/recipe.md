---
id: python-assertequals-removed
title: unittest assertEquals and other aliases are removed
stack: python
applies_to: ">= 3.12"
tags: ["unittest", "testing", "migration"]
errors: ["has no attribute 'assertEquals'"]
sources: ["https://docs.python.org/3/whatsnew/3.12.html"]
---

## Mistake

```python
self.assertEquals(a, b)
self.assertRegexpMatches(s, r)
```

## Correct

```python
self.assertEqual(a, b)
self.assertRegex(s, r)
```

## Why

The deprecated aliases (assertEquals, assertNotEquals, assert_, failUnless, assertRegexpMatches, assertDictContainsSubset) were removed in 3.12.

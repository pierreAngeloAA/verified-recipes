---
id: python-invalid-escape-raw-string
title: Regex backslashes need raw strings
stack: python
applies_to: ">= 3.12"
tags: ["regex", "strings", "syntax"]
errors: ["invalid escape sequence '\\d'"]
sources: ["https://docs.python.org/3/whatsnew/3.12.html"]
---

## Mistake

```python
re.findall("\d+\.\d+", s)
```

## Correct

```python
re.findall(r"\d+\.\d+", s)
```

## Why

Unknown escapes like `\d` are a SyntaxWarning since 3.12 and will become a SyntaxError. Use `r"..."`.

---
id: php-non-numeric-arithmetic
title: Arithmetic on non-numeric strings throws TypeError
stack: php
applies_to: ">= 8.0"
tags: ["strings", "types", "math"]
errors: ["Unsupported operand types: string * int"]
sources: ["https://wiki.php.net/rfc/saner-string-to-number"]
---

## Mistake

```php
$total = $_POST["qty"] * 2;  // "abc" or ""
```

## Correct

```php
$qty = filter_var($_POST["qty"] ?? null, FILTER_VALIDATE_INT);
if ($qty === false) throw new InvalidArgumentException("qty");
$total = $qty * 2;
```

## Why

Validate input before doing math; leading-numeric strings like "5 apples" still only warn.

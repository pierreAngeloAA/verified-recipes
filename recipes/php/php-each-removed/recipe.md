---
id: php-each-removed
title: each() is removed; use foreach
stack: php
applies_to: ">= 8.0"
tags: ["arrays", "iteration", "migration"]
errors: ["Call to undefined function each()"]
sources: ["https://www.php.net/manual/en/control-structures.foreach.php"]
---

## Mistake

```php
while (list($k, $v) = each($arr)) { ... }
```

## Correct

```php
foreach ($arr as $k => $v) { ... }
```

## Why

Deprecated in 7.2, removed in 8.0. Same for create_function (use fn() => ...).

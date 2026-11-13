---
id: php-implode-argument-order
title: implode() takes the separator first
stack: php
applies_to: ">= 8.0"
tags: ["strings", "arrays", "migration"]
errors: ["implode(): Argument #1 ($separator) must be of type string, array given"]
sources: ["https://www.php.net/manual/en/function.implode.php"]
---

## Mistake

```php
$csv = implode($items, ", ");
```

## Correct

```php
$csv = implode(", ", $items);
```

## Why

The legacy (array, separator) order was removed in 8.0.

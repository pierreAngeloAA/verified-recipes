---
id: php-count-null
title: count() throws on null and scalars
stack: php
applies_to: ">= 8.0"
tags: ["arrays", "types", "null"]
errors: ["count(): Argument #1 ($value) must be of type Countable|array, null given"]
sources: ["https://www.php.net/manual/en/function.count.php"]
---

## Mistake

```php
$n = count($maybeNull);
```

## Correct

```php
$n = count($maybeNull ?? []);
// or is_countable($x) ? count($x) : 0
```

## Why

PHP 7.2 warned, PHP 8 throws TypeError. Common with optional query results and json_decode() returning null.

---
id: php-array-key-exists-object
title: array_key_exists no longer accepts objects
stack: php
applies_to: ">= 8.0"
tags: ["arrays", "objects", "migration"]
errors: ["array_key_exists(): Argument #2 ($array) must be of type array, stdClass given"]
sources: ["https://www.php.net/manual/en/function.property-exists.php"]
---

## Mistake

```php
if (array_key_exists("id", $obj)) { ... }
```

## Correct

```php
if (property_exists($obj, "id")) { ... }
// or isset($obj->id) when null means missing
```

## Why

Object support was removed in 8.0.

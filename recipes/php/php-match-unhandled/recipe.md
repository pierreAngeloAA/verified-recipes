---
id: php-match-unhandled
title: match without default throws UnhandledMatchError
stack: php
applies_to: ">= 8.0"
tags: ["match", "control-flow"]
errors: ["UnhandledMatchError: Unhandled match case 5"]
sources: ["https://www.php.net/manual/en/control-structures.match.php"]
---

## Mistake

```php
$label = match ($status) {
    1 => "active",
    2 => "blocked",
};
```

## Correct

```php
$label = match ($status) {
    1 => "active",
    2 => "blocked",
    default => "unknown",
};
```

## Why

Unlike switch, match is exhaustive and compares strictly (===): "1" does not match 1.

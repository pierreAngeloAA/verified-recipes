---
id: php-curly-string-offset
title: $str{0} is removed; use $str[0]
stack: php
applies_to: ">= 8.0"
tags: ["strings", "syntax", "migration"]
errors: ["syntax error, unexpected token \"{\""]
sources: ["https://www.php.net/manual/en/language.types.string.php#language.types.string.substr"]
---

## Mistake

```php
$first = $str{0};
```

## Correct

```php
$first = $str[0];        // byte
$first = mb_substr($str, 0, 1);  // character
```

## Why

Curly-brace offsets were removed in 8.0 and now fail at parse time.

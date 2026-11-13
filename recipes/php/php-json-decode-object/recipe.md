---
id: php-json-decode-object
title: json_decode returns objects unless you pass true
stack: php
applies_to: ">= 7.0"
tags: ["json", "arrays"]
errors: ["Cannot use object of type stdClass as array"]
sources: ["https://www.php.net/manual/en/function.json-decode.php"]
---

## Mistake

```php
$data = json_decode($body);
$id = $data["id"];
```

## Correct

```php
$data = json_decode($body, true, flags: JSON_THROW_ON_ERROR);
$id = $data["id"];
```

## Why

The default is stdClass; invalid JSON returns null silently unless JSON_THROW_ON_ERROR is set.

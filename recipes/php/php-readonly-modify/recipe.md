---
id: php-readonly-modify
title: readonly properties can't change after construction
stack: php
applies_to: ">= 8.1"
tags: ["classes", "readonly", "immutability"]
errors: ["Cannot modify readonly property User::$name"]
sources: ["https://www.php.net/manual/en/language.oop5.properties.php#language.oop5.properties.readonly-properties"]
---

## Mistake

```php
$user->name = "New";
```

## Correct

```php
$user = $user->withName("New");
// public function withName(string $n): static { return new static($n); }
```

## Why

readonly is init-once, even inside the class. `clone` with changes needs a wither (PHP 8.5: clone($u, ['name' => 'New'])).

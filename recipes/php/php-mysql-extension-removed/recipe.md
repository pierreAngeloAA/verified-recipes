---
id: php-mysql-extension-removed
title: mysql_* functions are gone; use PDO or mysqli
stack: php
applies_to: ">= 7.0"
tags: ["database", "mysql", "pdo", "migration"]
errors: ["Call to undefined function mysql_connect()"]
sources: ["https://www.php.net/manual/en/book.pdo.php"]
---

## Mistake

```php
$db = mysql_connect($host, $user, $pass);
$r = mysql_query("SELECT * FROM users WHERE id = $id");
```

## Correct

```php
$db = new PDO("mysql:host=$host;dbname=app;charset=utf8mb4", $user, $pass);
$st = $db->prepare("SELECT * FROM users WHERE id = ?");
$st->execute([$id]);
```

## Why

Removed in PHP 7. Prepared statements also close the SQL injection in the interpolated query.

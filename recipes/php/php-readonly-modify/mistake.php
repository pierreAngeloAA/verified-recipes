<?php
final class User {
    public function __construct(public readonly string $name) {}
}
$u = new User("Ada");
$u->name = "New";

<?php
final class User {
    public function __construct(public readonly string $name) {}
    public function withName(string $n): static { return new static($n); }
}
$u = (new User("Ada"))->withName("New");
if ($u->name !== "New") exit(1);

<?php
$s = 5;
$l = match ($s) { 1 => "active", 2 => "blocked", default => "unknown" };
if ($l !== "unknown") exit(1);

<?php
$out = [];
foreach (["a" => 1] as $k => $v) $out[] = "$k=$v";
if ($out !== ["a=1"]) exit(1);

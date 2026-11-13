<?php
$d = json_decode('{"id":7}', true, flags: JSON_THROW_ON_ERROR);
if ($d["id"] !== 7) exit(1);

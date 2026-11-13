<?php
$qty = filter_var("5", FILTER_VALIDATE_INT);
if ($qty * 2 !== 10) exit(1);

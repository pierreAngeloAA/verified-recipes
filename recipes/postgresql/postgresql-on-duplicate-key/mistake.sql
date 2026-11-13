CREATE TABLE stock (sku text PRIMARY KEY, qty int);
INSERT INTO stock VALUES ('a', 1) ON DUPLICATE KEY UPDATE qty = qty + 1;

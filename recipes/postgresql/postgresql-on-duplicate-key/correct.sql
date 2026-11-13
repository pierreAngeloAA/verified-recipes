CREATE TABLE stock (sku text PRIMARY KEY, qty int);
INSERT INTO stock VALUES ('a', 1) ON CONFLICT (sku) DO UPDATE SET qty = stock.qty + EXCLUDED.qty;

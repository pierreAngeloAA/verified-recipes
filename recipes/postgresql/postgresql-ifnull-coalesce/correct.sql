CREATE TABLE orders (discount int);
SELECT COALESCE(discount, 0) FROM orders;

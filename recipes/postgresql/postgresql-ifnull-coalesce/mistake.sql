CREATE TABLE orders (discount int);
SELECT IFNULL(discount, 0) FROM orders;

CREATE TABLE orders (id int, customer_id int, total int);
SELECT customer_id, id, sum(total) FROM orders GROUP BY customer_id;

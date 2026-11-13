CREATE TABLE orders (id int, customer_id int, total int);
SELECT customer_id, sum(total), max(id) FROM orders GROUP BY customer_id;

CREATE TABLE orders (user_id int);
CREATE INDEX CONCURRENTLY IF NOT EXISTS orders_user_idx ON orders (user_id);

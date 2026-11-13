CREATE TABLE orders (user_id int);
BEGIN;
CREATE INDEX CONCURRENTLY orders_user_idx ON orders (user_id);
COMMIT;

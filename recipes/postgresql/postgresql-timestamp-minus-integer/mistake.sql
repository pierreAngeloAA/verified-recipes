CREATE TABLE events (created_at timestamptz);
SELECT * FROM events WHERE created_at > now() - 7;

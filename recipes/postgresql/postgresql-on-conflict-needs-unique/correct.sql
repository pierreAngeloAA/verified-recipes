CREATE TABLE users (id int, email text UNIQUE);
INSERT INTO users VALUES (1, 'a@x') ON CONFLICT (email) DO NOTHING;

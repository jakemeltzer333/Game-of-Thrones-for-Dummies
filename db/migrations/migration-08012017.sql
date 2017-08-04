
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS got CASCADE;
DROP TABLE IF EXISTS info CASCADE;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS got (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  user_id INTEGER REFERENCES users(id) NOT NULL,
  culture VARCHAR(255),
  titles VARCHAR(255),
  aliases VARCHAR(255),
  father VARCHAR(255),
  mother VARCHAR(255),
  allegiances VARCHAR(255),
  playedBy VARCHAR(255)
);

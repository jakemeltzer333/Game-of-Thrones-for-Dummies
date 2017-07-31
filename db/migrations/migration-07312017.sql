\c got_info_dev

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL
)

CREATE TABLE IF NOT EXISTS got (
  id SERIAL PRIMARY KEY,
  character_name VARCHAR(255),
  house VARCHAR(255),
  actor_name VARCHAR(255)
)

CREATE TABLE IF NOT EXISTS info (
  id SERIAL PRIMARY KEY,
  info_title VARCHAR(255),
  info_info VARCHAR(255),
  char_id INT REFERENCES got.id
)

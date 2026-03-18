DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  release_year INTEGER NOT NULL,
  difficulty_level INTEGER NOT NULL CHECK (difficulty_level IN (1,2,3)),
  image_url TEXT
);

CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
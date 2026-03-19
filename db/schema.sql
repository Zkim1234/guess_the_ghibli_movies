-- Drop tables safely (rerun without errors)
DROP TABLE IF EXISTS movie_images;
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS movies;

-- Movies table
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  release_year INTEGER NOT NULL
);

-- Images per level
CREATE TABLE movie_images (
  id SERIAL PRIMARY KEY,
  movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
  difficulty_level INTEGER CHECK (difficulty_level IN (1,2,3)),
  image_url TEXT NOT NULL
);

-- Optional scores table
CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  username TEXT,
  score INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional table for multiple choice options
CREATE TABLE movie_options (
  id SERIAL PRIMARY KEY,
  movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE
);
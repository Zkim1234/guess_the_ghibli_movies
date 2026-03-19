-- inserting movies and year
INSERT INTO movies (title, release_year)
VALUES
('Spirited Away', 2001),
('My Neighbor Totoro', 1988),
('Howl''s Moving Castle', 2004),
('Kiki''s Delivery Service', 1989),
('Ponyo', 2008),
('Princess Mononoke', 1997),
('The Cat Returns', 2002),
('Arrietty', 2010),
('From Up on Poppy Hill', 2011),
('Whisper of the Heart', 1995),
('Ocean Waves', 1993),
('The Tale of the Princess Kaguya', 2013),
('Pom Poko', 1994),
('The Wind Rises', 2013),
('When Marnie Was There', 2014),
('Only Yesterday', 1991),
('Earwig and the Witch', 2020);

-- Each stage has different images for same movies.
INSERT INTO movie_images (movie_id, difficulty_level, image_url)
VALUES
(1, 1, '/images/ghibli-level01/10-spirited-away.jpg'),
(2, 1, '/images/ghibli-level01/08-my-neighbor-totoro.jpg'),
(3, 1, '/images/ghibli-level01/07-howls-moving-castle.jpg'),
(4, 1, '/images/ghibli-level01/06-kikis-delivery-service.avif'),
(5, 1, '/images/ghibli-level01/04-when-marine-was-there.webp'),
(6, 1, '/images/ghibli-level01/11-princess-mononoke.jpg'),
(7, 1, '/images/ghibli-level01/12-the-cat-returns.jpeg'),
(8, 1, '/images/ghibli-level01/14-arrietty.jpeg'),
(9, 1, '/images/ghibli-level01/02-from-up-on-poppy-hill.jpg'),
(10, 1, '/images/ghibli-level01/09-whisper-of-the-heart.jpg'),
(11, 1, '/images/ghibli-level01/13-ocean-waves.jpg'),
(12, 1, '/images/ghibli-level01/05-the-tale-of-princess-kaguya.jpg'),
(13, 1, '/images/ghibli-level01/03-pom-poko.jpg'),
(14, 1, '/images/ghibli-level01/15-the-wind-rises.jpg'),
(15, 1, '/images/ghibli-level01/01-aya-and-the-witch-a-good.webp');

-- Each stage has different images for same movies.
INSERT INTO movie_images (movie_id, difficulty_level, image_url)
VALUES
(1, 2, '/images/ghibli-level02/10-spirited-away.png'),
(2, 2, '/images/ghibli-level02/08-my-neighbor-totoro.png'),
(3, 2, '/images/ghibli-level02/07-howls-moving-castle.jpg'),
(4, 2, '/images/ghibli-level02/01-ponyo.jpeg'),
(5, 2, '/images/ghibli-level02/06-kikis-delivery-service.jpeg'),
(6, 2, '/images/ghibli-level02/11-princess-mononoke.webp'),
(7, 2, '/images/ghibli-level02/12-the-cat-returns.jpg'),
(8, 2, '/images/ghibli-level02/14-arrietty.jpeg'),
(9, 2, '/images/ghibli-level02/02-from-up-on-poppy-hill.jpg'),
(10, 2, '/images/ghibli-level02/09-whisper-of-the-heart.jpg'),
(11, 2, '/images/ghibli-level02/13-ocean-waves.png'),
(12, 2, '/images/ghibli-level02/05-the-tale-of-princess-kaguya.webp'),
(13, 2, '/images/ghibli-level02/03-pom-poko.jpeg'),
(14, 2, '/images/ghibli-level02/15-the-wind-rises.jpg'),
(15, 2, '/images/ghibli-level02/04-when-marine-was-there.jpg');

-- Each stage has different images for same movies.
INSERT INTO movie_images (movie_id, difficulty_level, image_url)
VALUES
(1, 3, '/images/ghibli-level03/10-spirited-away.jpg'),
(2, 3, '/images/ghibli-level03/08-my-neighbor-totoro.webp'),
(3, 3, '/images/ghibli-level03/07-howls-moving-castle.webp'),
(4, 3, '/images/ghibli-level03/01-ponyo.png'),
(5, 3, '/images/ghibli-level03/06-kikis-delivery-service.jpg'),
(6, 3, '/images/ghibli-level03/11-princess-mononoke.jpg'),
(7, 3, '/images/ghibli-level03/12-the-cat-returns.jpg'),
(8, 3, '/images/ghibli-level03/14-arrietty.jpg'),
(9, 3, '/images/ghibli-level03/02-only-yesterday.jpg'),
(10, 3, '/images/ghibli-level03/09-whisper-of-the-heart.webp'),
(11, 3, '/images/ghibli-level03/13-ocean-waves.png'),
(12, 3, '/images/ghibli-level03/05-the-tale-of-princess-kaguya.webp'),
(13, 3, '/images/ghibli-level03/03-pom-poko.jpg'),
(14, 3, '/images/ghibli-level03/15-the-wind-rises.jpg'),
(15, 3, '/images/ghibli-level03/04-when-marine-was-there.jpg');

-- For multiple answer options
INSERT INTO movie_options (movie_id, option_text, is_correct) VALUES

-- 1 Spirited Away
(1, 'Spirited Away', TRUE),
(1, 'Spirited Too Far', FALSE),
(1, 'Taken by Ghost Uber', FALSE),

-- 2 Totoro
(2, 'My Neighbor Totoro', TRUE),
(2, 'My Roommate Totoro', FALSE),
(2, 'Totoro Next Door HOA Issues', FALSE),

-- 3 Howl
(3, 'Howl''s Moving Castle', TRUE),
(3, 'Howl''s Housing Crisis', FALSE),
(3, 'Howl''s Airbnb Castle', FALSE),

-- 4 Kiki
(4, 'Kiki''s Delivery Service', TRUE),
(4, 'Kiki''s DoorDash Service', FALSE),
(4, 'Kiki''s Amazon Prime Delivery', FALSE),

-- 5 Ponyo
(5, 'Ponyo', TRUE),
(5, 'Fish Girl Chaos', FALSE),
(5, 'Ponyo and the Big Splash', FALSE),

-- 6 Mononoke
(6, 'Princess Mononoke', TRUE),
(6, 'Princess of the Forest Drama', FALSE),
(6, 'Wolf Girl vs Humans', FALSE),

-- 7 Cat Returns
(7, 'The Cat Returns', TRUE),
(7, 'The Cat Won''t Leave', FALSE),
(7, 'Return of the Cat King', FALSE),

-- 8 Arrietty
(8, 'Arrietty', TRUE),
(8, 'Tiny Girl Big Problems', FALSE),
(8, 'Borrower Chronicles', FALSE),

-- 9 Poppy Hill
(9, 'From Up on Poppy Hill', TRUE),
(9, 'Up the Hill Vibes', FALSE),
(9, 'Poppy Hill High School Drama', FALSE),

-- 10 Whisper
(10, 'Whisper of the Heart', TRUE),
(10, 'Whisper but Louder', FALSE),
(10, 'Heart Murmurs', FALSE),

-- 11 Ocean Waves
(11, 'Ocean Waves', TRUE),
(11, 'Teen Drama by the Sea', FALSE),
(11, 'Salty Feelings', FALSE),

-- 12 Kaguya
(12, 'The Tale of the Princess Kaguya', TRUE),
(12, 'Moon Princess Problems', FALSE),
(12, 'Bamboo Girl Saga', FALSE),

-- 13 Pom Poko
(13, 'Pom Poko', TRUE),
(13, 'Raccoon Chaos Society', FALSE),
(13, 'Tanuki Shenanigans', FALSE),

-- 14 Wind Rises
(14, 'The Wind Rises', TRUE),
(14, 'Wind but Sad', FALSE),
(14, 'Planes and Pain', FALSE),

-- 15 Marnie
(15, 'When Marnie Was There', TRUE),
(15, 'Marnie Ghosted Me', FALSE),
(15, 'The Mysterious Girl Next Door', FALSE),

-- 16 Only Yesterday
(16, 'Only Yesterday', TRUE),
(16, 'Just Yesterday Honestly', FALSE),
(16, 'Flashback Simulator', FALSE),

-- 17 Earwig
(17, 'Earwig and the Witch', TRUE),
(17, 'The Witch Babysitter', FALSE),
(17, 'Magic Child Chaos', FALSE);
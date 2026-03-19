const db = require("../config/db");

// Mock data for development/testing when database is unavailable
const mockMovies = [
  { id: 1, title: "Spirited Away", release_year: 2001 },
  { id: 2, title: "My Neighbor Totoro", release_year: 1988 },
  { id: 3, title: "Howl's Moving Castle", release_year: 2004 },
  { id: 4, title: "Kiki's Delivery Service", release_year: 1989 },
  { id: 5, title: "Ponyo", release_year: 2008 },
  { id: 6, title: "Princess Mononoke", release_year: 1997 },
  { id: 7, title: "The Cat Returns", release_year: 2002 },
  { id: 8, title: "Arrietty", release_year: 2010 },
  { id: 9, title: "From Up on Poppy Hill", release_year: 2011 },
  { id: 10, title: "Whisper of the Heart", release_year: 1995 },
];

const mockOptions = {
  1: ["Spirited Away", "Spirited Too Far", "Taken by Ghost Uber"],
  2: [
    "My Neighbor Totoro",
    "My Roommate Totoro",
    "Totoro Next Door HOA Issues",
  ],
  3: ["Howl's Moving Castle", "Howl's Housing Crisis", "Howl's Airbnb Castle"],
  4: [
    "Kiki's Delivery Service",
    "Kiki's DoorDash Service",
    "Kiki's Amazon Prime Delivery",
  ],
  5: ["Ponyo", "Fish Girl Chaos", "Ponyo and the Big Splash"],
  6: [
    "Princess Mononoke",
    "Princess of the Forest Drama",
    "Princess Mononoke: The Sequel",
  ],
  7: ["The Cat Returns", "The Cat Leaves", "The Cat's Uber Ride"],
  8: ["Arrietty", "Tiny Troubles", "Arrietty and the Borrowers"],
  9: [
    "From Up on Poppy Hill",
    "From Down in the Valley",
    "Poppy Hill: The Movie",
  ],
  10: ["Whisper of the Heart", "Scream of the Heart", "Whisper of the Soul"],
};

const mockImagesByLevel = {
  1: {
    1: "/images/ghibli-level01/10-spirited-away.jpg",
    2: "/images/ghibli-level01/08-my-neighbor-totoro.jpg",
    3: "/images/ghibli-level01/07-howls-moving-castle.jpg",
    4: "/images/ghibli-level01/06-kikis-delivery-service.avif",
    // No Ponyo asset exists in level01 folder; use closest available Ponyo image
    5: "/images/ghibli-level02/01-ponyo.jpeg",
    6: "/images/ghibli-level01/11-princess-mononoke.jpg",
    7: "/images/ghibli-level01/12-the-cat-returns.jpeg",
    8: "/images/ghibli-level01/14-arrietty.jpeg",
    9: "/images/ghibli-level01/02-from-up-on-poppy-hill.jpg",
    10: "/images/ghibli-level01/09-whisper-of-the-heart.jpg",
  },
  2: {
    1: "/images/ghibli-level02/10-spirited-away.png",
    2: "/images/ghibli-level02/08-my-neighbor-totoro.png",
    3: "/images/ghibli-level02/07-howls-moving-castle.jpg",
    4: "/images/ghibli-level02/06-kikis-delivery-service.jpeg",
    5: "/images/ghibli-level02/01-ponyo.jpeg",
    6: "/images/ghibli-level02/11-princess-mononoke.webp",
    7: "/images/ghibli-level02/12-the-cat-returns.jpg",
    8: "/images/ghibli-level02/14-arrietty.jpeg",
    9: "/images/ghibli-level02/02-from-up-on-poppy-hill.jpg",
    10: "/images/ghibli-level02/09-whisper-of-the-heart.jpg",
  },
  3: {
    1: "/images/ghibli-level03/10-spirited-away.jpg",
    2: "/images/ghibli-level03/08-my-neighbor-tortoro.webp",
    3: "/images/ghibli-level03/07-howls-moving-castle.webp",
    4: "/images/ghibli-level03/06-kikis-delivery-service.jpg",
    5: "/images/ghibli-level03/01-ponyo.png",
    6: "/images/ghibli-level03/11-princess-mononoke.jpg",
    7: "/images/ghibli-level03/12-the-cat-returns.jpg",
    8: "/images/ghibli-level03/14-arrietty.jpg",
    9: "/images/ghibli-level03/03-pom-poko.jpg",
    10: "/images/ghibli-level03/09-whisper-of-the-heart.webp",
  },
};

const resolveImageUrl = (levelNum, movieTitle, imageUrl) => {
  // Seed data maps Ponyo (id 5) to a "when-marine" file for level 1.
  // Normalize to a Ponyo image so title and image match.
  if (
    levelNum === 1 &&
    movieTitle === "Ponyo" &&
    typeof imageUrl === "string" &&
    imageUrl.includes("when-marine")
  ) {
    return "/images/ghibli-level02/01-ponyo.jpeg";
  }

  return imageUrl;
};

// Get random questions for a specific level from database
const getRandomQuestions = async (levelNum, count = 5) => {
  try {
    const moviesQuery =
      levelNum === 1
        ? `
          SELECT m.id, m.title, m.release_year, mi.image_url
          FROM movies m
          INNER JOIN movie_images mi
            ON mi.movie_id = m.id
           AND mi.difficulty_level = $1
          INNER JOIN movie_options mo
            ON mo.movie_id = m.id
          GROUP BY m.id, m.title, m.release_year, mi.image_url
          HAVING COUNT(mo.id) >= 3
          ORDER BY RANDOM()
          LIMIT $2
        `
        : `
          SELECT m.id, m.title, m.release_year, mi.image_url
          FROM movies m
          INNER JOIN movie_images mi
            ON mi.movie_id = m.id
           AND mi.difficulty_level = $1
          ORDER BY RANDOM()
          LIMIT $2
        `;

    const moviesResult = await db.query(moviesQuery, [levelNum, count]);
    const movies = moviesResult.rows;

    // Get questions with images and options
    const questions = await Promise.all(
      movies.map(async (movie) => {
        const imageUrl = resolveImageUrl(
          levelNum,
          movie.title,
          movie.image_url,
        );

        // For Level 1, get multiple choice options (exactly 3)
        let choices = [];
        if (levelNum === 1) {
          const optionsQuery = `
            SELECT option_text
            FROM movie_options
            WHERE movie_id = $1
            ORDER BY is_correct DESC, id ASC
            LIMIT 3
          `;
          const optionsResult = await db.query(optionsQuery, [movie.id]);
          choices = optionsResult.rows.map((row) => row.option_text);

          // Shuffle choices to randomize correct answer position
          choices.sort(() => Math.random() - 0.5);
        }

        return {
          id: movie.id,
          image: imageUrl,
          correctTitle: movie.title,
          correctYear: movie.release_year,
          choices: levelNum === 1 ? choices : undefined,
          level: levelNum,
        };
      }),
    );

    return questions;
  } catch (error) {
    console.error("Database error, using mock data:", error.message);

    // Fallback to mock data
    const shuffled = mockMovies.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    return selected.map((movie) => {
      let choices = [];
      if (levelNum === 1) {
        // Get mock options for this movie and shuffle
        const baseOptions = mockOptions[movie.id]
          ? mockOptions[movie.id]
          : [movie.title, "Unknown 1", "Unknown 2"];

        choices = Array.from(new Set(baseOptions))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
      }

      return {
        id: movie.id,
        image:
          mockImagesByLevel[levelNum]?.[movie.id] ||
          "/images/level01-image.jpg",
        correctTitle: movie.title,
        correctYear: movie.release_year,
        choices: levelNum === 1 ? choices : undefined,
        level: levelNum,
      };
    });
  }
};

module.exports = { getRandomQuestions };

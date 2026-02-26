# 🎮 Guess The Ghibli Movie

## 📖 Project Overview

**Guess The Ghibli Movie** is a full-stack web application built with Node.js, Express, EJS, and PostgreSQL.

The game challenges players to identify Studio Ghibli films based on visual clues across three progressively difficult levels.

Players advance through stages by correctly guessing movie titles and release years, testing both their memory and knowledge of iconic animated films.

---

## 🕹 Game Levels

### ⭐ Level 1 – Popular

- Guess the **movie title**
- Includes the most well-known Studio Ghibli films

### 🌿 Level 2 – Intermediate

- Guess the **movie title OR release year**
- Includes moderately recognized films

### 🔥 Level 3 – Hard

- Guess the **movie title AND release year**
- Includes less mainstream films
- Requires precise knowledge

---

## 🛠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Templating Engine:** EJS
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Architecture Pattern:** MVC (Model–View–Controller)

---

## 🗄 Database

The application uses PostgreSQL to store:

- Movie data (title, release year, difficulty level, image)
- Optional score tracking and leaderboard data

---

## 🔐 Environment Variables (.env)

Create a .env file at the project root (this file is ignored by Git). You can copy this below to fill in your values:

- PORT=4000
- DATABASE_URL=your_database_url_here

const { getRandomQuestions } = require("../model/movieModel");

const home = (req, res) => {
  res.render("pages/index");
};

const levels = (req, res) => {
  res.render("pages/level");
};

const level = (req, res) => {
  const levelNum = req.params.level;
  res.render("pages/level", { level: levelNum });
};

const game = (req, res) => {
  const levelNum = req.params.level;
  if (!levelNum || ![1, 2, 3].includes(parseInt(levelNum))) {
    return res.redirect("/level");
  }
  res.render("pages/game", { levelNum });
};

const result = (req, res) => {
  const score = Number.parseInt(req.query.score, 10) || 0;
  const total = Number.parseInt(req.query.total, 10) || 5;
  const levelNum = Number.parseInt(req.query.level, 10) || 1;
  const isSuccess = score >= Math.ceil(total * 0.6);

  res.render("pages/result", {
    score,
    total,
    levelNum,
    isSuccess,
  });
};

const getQuestions = async (req, res) => {
  const levelNum = parseInt(req.params.level);

  if (!levelNum || ![1, 2, 3].includes(levelNum)) {
    return res.status(400).json({ error: "Invalid level" });
  }

  try {
    const questions = await getRandomQuestions(levelNum, 5);
    res.json({ questions, levelNum });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Failed to load questions" });
  }
};

module.exports = { home, levels, level, game, result, getQuestions };

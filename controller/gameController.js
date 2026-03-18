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

module.exports = { home, levels, level };
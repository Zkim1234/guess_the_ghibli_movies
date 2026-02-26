const home = (req, res) => {
  res.render("pages/index");
};

const level = (req, res) => {
  const level = req.params.level;
  res.render("pages/level", { level });
};

module.exports = { home, level };
/*Game Routes */

const express = require("express");
const router = express.Router();
const gameController = require("../controller/gameController");

router.get("/", gameController.home);
router.get("/level", gameController.levels);
router.get("/levels", gameController.levels);
router.get("/level/:level", gameController.level);
router.get("/game/:level", gameController.game);
router.get("/result", gameController.result);
router.get("/api/questions/:level", gameController.getQuestions);

module.exports = router;

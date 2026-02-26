/*Game Routes */

const express = require("express");
const router = express.Router();
const gameController = require("../controller/gameController");

router.get("/", gameController.home);
router.get("/level/:level", gameController.level);

module.exports = router;
const express = require("express");
const {getRecommendation} = require("../controllers/recommendationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",authMiddleware,getRecommendation);

module.exports = router;
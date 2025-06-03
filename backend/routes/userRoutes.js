const express = require("express");
const {getUserProfile, updateUserProfile} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",authMiddleware,getUserProfile);
router.put("/update",authMiddleware,updateUserProfile);

module.exports = router;
const express = require("express");
const {logWorkout,getWorkoutHistory,deleteWorkoutLog,updateWorkoutLog} = require("../controllers/workoutLogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",authMiddleware,getWorkoutHistory);
router.post("/create",authMiddleware,logWorkout);
router.delete("/delete/:logId",authMiddleware,deleteWorkoutLog);
router.put("/update/:logId",authMiddleware,updateWorkoutLog);

module.exports = router;
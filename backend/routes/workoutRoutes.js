const express = require("express");
const {createWorkout,getAllWorkout,getWorkoutById,updateWorkoutById,deleteWorkoutById} = require("../controllers/workoutController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create",authMiddleware,createWorkout);
router.get("/",getAllWorkout);
router.get("/:id",getWorkoutById);
router.put("/update/:id",authMiddleware,updateWorkoutById);
router.delete("/delete/:id",authMiddleware,deleteWorkoutById);

module.exports = router;
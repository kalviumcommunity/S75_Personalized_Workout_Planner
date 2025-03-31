const User = require("../models/User");
const Workout = require("../models/Workout");

exports.getRecommendation = async (req,res)=>{
    try{
        const user = await User.findById(req.user.userId);
        if(!user){
            res.status(404).json({message : "User not found"});
        }
        //console.log("User Data:", req.user); // Debugging
        //console.log("User Fitness Goal:", req.user.fitnessGoal);  //Debugging
        const recommendedWorkouts = await Workout.find({category : user.fitnessGoal});
        //console.log("Recommended Workouts:", recommendedWorkouts); 
        res.status(200).json(recommendedWorkouts);
    }
    catch(error){
        res.status(500).json({Error : "Server Error",error});
    }
}
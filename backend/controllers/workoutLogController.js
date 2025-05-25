const WorkoutLog = require("../models/WorkoutLog");

exports.logWorkout = async (req,res) =>{
    try{
        const {workoutId,duration,notes} = req.body;

        const newLog = new WorkoutLog({
            userId : req.user.userId,
            workoutId,
            duration,
            notes,
        })

        await newLog.save();
        res.status(201).json({message : "Workout Logged Successfully",newLog});
    }
    catch(error){
        console.error("Error while logging workout : ",error);
        res.status(500).json({Error : "Error while logging workout"});   
    }
};

exports.getWorkoutHistory = async (req,res) =>{
    try{
       // console.log("Authenticated User ID:", req.user.userId); // Check if this is correct
        const logs = await WorkoutLog.find({userId : req.user.userId}).populate("workoutId","name description");
        if(!logs){
            return res.status(404).json({message:"No workout logs found"});
        }
    //console.log("Filtered Workout History:",logs.length); // Debugging
        res.status(200).json(logs);
    }
    catch(error){
        console.error("Error while getting workout-log : ",error);
        res.status(500).json({Error : "Error while getting workout-log"});   
    }
};

exports.deleteWorkoutLog = async (req,res) =>{
    try {
        const {logId} = req.params;
        const userId = req.user.userId;

        const deletedWorkout = await WorkoutLog.findOneAndDelete({_id:logId, userId});
        if(!deletedWorkout){
            return res.status(404).json({message:"Workout log not found or unauthorized"});
        }

        res.status(200).json({message:"Workout deleted successfully"});
    } catch(error){
        console.error("Error while deleting workout-log : ",error);
        res.status(500).json({Error : "Error while deleting workout-log"});   
    }
};

exports.updateWorkoutLog = async (req,res) =>{
    try {
        const {logId} = req.params;
        const {duration, notes} = req.body;

        //console.log("Received ID in backend:", logId)
        const updatedLog = await WorkoutLog.findOneAndUpdate(
            {_id: logId, userId: req.user.userId},
            {duration, notes},
            {new: true}
        );
        //console.log("Updated Log:", updatedLog); 
        //console.log("Received Data:", { duration, notes })

        if(!updatedLog){
            return res.status(404).json({message:"Workout log not found"});
        }
        
        res.status(200).json(updatedLog);
    }catch(error){
        console.error("Error while updating workout-log : ",error);
        res.status(500).json({Error : "Error while updating workout-log"});   
    }
};
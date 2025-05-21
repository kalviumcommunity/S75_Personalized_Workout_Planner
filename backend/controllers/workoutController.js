const Workout = require("../models/Workout");

exports.createWorkout = async (req,res) =>{
    try{
        const {name,description,difficulty,duration,exercises} = req.body;

        const newWorkout = new Workout({
            name,
            description,
            difficulty,
            duration,
            exercises
        });

        await newWorkout.save(); 
        res.status(201).json({message : "Workout created Successfully",newWorkout})
    }
    catch(error){
        console.error("Error while creating workouts : ",error);
        res.status(500).json({Error : "Error while creating workouts"});
    }
}

exports.getAllWorkout = async (req,res) =>{
    try{
        const workouts = await Workout.find();  
        res.status(200).json(workouts);
    }
    catch(error){
        console.error("Error while getting workouts : ",error);
        res.status(500).json({Error : "Error while getting workouts"});    
    }
}

exports.getWorkoutById = async (req,res) =>{
    try{
        const workout = await Workout.findById(req.params.id);
        if(!workout){
            return res.status(404).json({message : "Workout not found"});
        }

        res.status(200).json(workout)
    }
    catch(error){
        console.error("Error while getting workouts by id : ",error);
        res.status(500).json({Error : "Error while getting workouts by id"});
    }
}

exports.updateWorkoutById = async(req,res) =>{
    try{
        const updatedWorkout = await Workout.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true,}
        );
        if(!updatedWorkout){
            return res.status(500).json({message : "Workout not found"});
        }

        res.status(200).json({message : "Workout updated Successfully",updatedWorkout});
    }
    catch(error){
        console.error("Error while updating workout by id : ",error);
        res.status(500).json({Error : "Error while updating controller by id"});   
    }
}

exports.deleteWorkoutById = async(req,res) => {
    try{
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
        if(!deletedWorkout){
            return res.status(404).json({message : "Workout not found"});
        }

        res.status(200).json({message : "Workout deleted Successfully"});
    }
    catch(error){
        console.error("Error while deleting workout by id : ",error);
        res.status(500).json({Error : "Error while deleting workout by id"});   
    }
}
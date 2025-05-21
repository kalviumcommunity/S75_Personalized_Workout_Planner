const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    difficulty:{
        type:String,
        enum:["easy","medium","hard"],
        required:true,
    },
    duration:{
        type:Number,
        required:true,
    },
    exercises:[{
        type:String,
    }],
    category: { 
        type: String, 
        enum: ["weight loss", "muscle gain", "endurance", "general fitness"], 
        required: true 
      },
},{timestamps:true});

const Workout = mongoose.model("Workout",WorkoutSchema);

module.exports = Workout;
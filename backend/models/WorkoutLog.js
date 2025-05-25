const mongoose = require("mongoose");

const workoutLogSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    workoutId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Workout",
        required : true,
    },
    date : {
        type : Date,
        default : Date.now,
    },
    duration : {
        type : Number,
    },
    notes :{
        type : String,
    }
});

const WorkoutLog = mongoose.model("WorkoutLog",workoutLogSchema);

module.exports = WorkoutLog;
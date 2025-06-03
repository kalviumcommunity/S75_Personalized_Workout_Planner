const mongoose=require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:20,
    },
    fitnessGoal:{
        type:String,
        enum:["weight loss","muscle gain","endurance","general fitness"],
        required:true,
    },
    profilePicture : {
        type : String,
        default : "",
    },
},{timestamps:true});

const User = mongoose.model("User",UserSchema);
module.exports = User;
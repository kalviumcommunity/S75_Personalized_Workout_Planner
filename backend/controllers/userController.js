const User = require("../models/User");

exports.getUserProfile = async (req,res) =>{
    try{
        const user = await User.findById(req.user.userId).select("-password");
        if(!user){
            return res.status(404).json({message : "User not found"});
        }

        res.status(200).json(user);
    }
    catch(error){
        console.error("Error while getting user profile : ",error)
        res.status(500).json({Error : "Error while getting user profile"});;
    }
}

exports.updateUserProfile = async (req,res) =>{
    try{
        const {name,fitnessGoal,profilePicture} = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            {name,fitnessGoal,profilePicture},
            {new : true, select : "-password"}
        );
        if(!updatedUser){
            return res.status(404).json({message : "User not found"});
        }
        //console.log("Updated user :",updatedUser)
        res.status(200).json({message : "UserProfile updated Successfully",updatedUser});
    }
    catch(error){
        console.error("Error while updating user profile : ",error)
        res.status(500).json({Error : "Error while updating user profile"});
    }
}
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register= async(req,res)=>{
    try{
        const {name,email,password,fitnessGoal} = req.body;

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        user = new User({
            name,
            email,
            password:hashedPassword,
            fitnessGoal,
        })
        await user.save();

        res.status(201).json({message:"User Created Successfully"});
    }
    catch(error){
        res.status(500).json({Error : "Server error",error});
    }
}

exports.login = async(req,res)=>{
    try{
        const {email,password}= req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message : "Invalid Email"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message : "Invalid Password"});
        }

        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET, {expiresIn:"1h"});

        res.status(200).json({token, userId : user._id, fitnessGoal: user.fitnessGoal});
    }
    catch(error){
        res.status(500).json({Error : "Server error",error})
    }
}
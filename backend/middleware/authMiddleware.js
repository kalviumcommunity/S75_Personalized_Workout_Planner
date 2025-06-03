const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async(req,res,next)=>{
    const authHeader = req.header("Authorization");
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message : "Access denied. No token or invalid format provided."})
    }
    const token = authHeader;

    try{
        const decode = await jwt.verify(token.replace("Bearer ",""),process.env.JWT_SECRET);
        req.user = decode;
        //console.log(decode);
        next();
    }
    catch(error){
        res.status(400).json({message : "Invalid Token", error : error});
    }
}

module.exports = authMiddleware;
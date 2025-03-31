const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const User = require("./models/User");
const Workout = require("./models/Workout");

const authRoutes = require("./routes/authRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");
const workoutLogRoutes = require("./routes/workoutLogRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

const authMiddleware = require("./middleware/authMiddleware");

dotenv.config();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth",authRoutes);
app.use("/api/protected",authMiddleware,(req,res)=>{
    res.json({message : "Access Granted",user : req.user});
})
app.use("/api/workouts",workoutRoutes);
app.use("/api/users",userRoutes);
app.use("/api/workout-log",workoutLogRoutes);
app.use("/api/recommendations",recommendationRoutes);

app.get("/",(req,res)=>{
    res.send("Workout Planner API is running ...");
})

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> console.log("MongoDB Connected"))
.catch((err)=> console.log(err));

app.listen(PORT,()=>console.log(`Server running on http://localhost:${PORT}`));
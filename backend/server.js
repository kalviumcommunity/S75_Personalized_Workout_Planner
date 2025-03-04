const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Workout Planner API is running ...");
})

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> console.log("MongoDB Connected"))
.catch((err)=> console.log(err));

app.listen(PORT,()=>console.log(`Server running on http://localhost:${PORT}`))
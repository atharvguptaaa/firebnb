const express=require("express")
const app=express()
const cors=require("cors")
const { default: mongoose } = require("mongoose")
const User = require("./models/User")
require("dotenv").config()
const bcrypt = require('bcrypt');

const bcryptSalt = bcrypt.genSaltSync(10);


app.use(express.json())

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
    
}))
console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL)


app.get("/test",(req,res)=>{
    res.json({
        message:"Api is working!"
    })
})



app.post("/register", async (req,res)=>{
    const {name,email,password}=req.body
    try {
        const userDoc= await User.create({
            name,
            email,  
            password:bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(userDoc)
    } catch (error) {
        res.status(422).json(error)
    }
   
})
app.listen(4000)

const express=require("express")
const app=express()
const cors=require("cors")
const { default: mongoose } = require("mongoose")
const User = require("./models/User")
const cookieParser=require("cookie-parser")
require("dotenv").config()
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

const bcryptSalt = bcrypt.genSaltSync(10);

const jwtSecret="dfsdbkfsdjksdjfu3rej"


app.use(express.json())
app.use(cookieParser())

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
    
}))
// console.log(process.env.MONGODB_URL);
const connnectDB=async()=>{
    try {
 
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(`Unable to connect to the Mongo db  ${error} `);
    }
    
}
connnectDB();


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

app.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    const userDoc= await User.findOne({email})
    if(userDoc){
        const passOk=bcrypt.compareSync(password,userDoc.password)
        if(passOk){
            // we want to respond with a cookie and an encrypted username 
            jwt.sign({email:userDoc.email, id:userDoc._id},jwtSecret,{}, (err,token)=>{
                if(err) throw err;
                res.cookie("token",token).json(userDoc)
            })
             
        }
        else{
            throw new Error("wrong password");
            res.json("wrong passwd")
        }
    }
    else{
        throw new Error("not found.");
        
        res.json("not found")
    }
}) 

app.get("/profile",(req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{}, async(err,cookieData)=>{
            if(err)throw err
            const {name,email,_id}= await User.findById(cookieData.id)
            res.json({name,email,_id})
        })
    }
    else{
        res.json(null)
    }
    
})

app.listen(4000)

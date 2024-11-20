const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const PlaceModel = require("./models/Place.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const bcryptSalt = bcrypt.genSaltSync(10);

const jwtSecret = "dfsdbkfsdjksdjfu3rej";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
// console.log(process.env.MONGODB_URL);
const connnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(`Unable to connect to the Mongo db  ${error} `);
  }
};
connnectDB();

app.get("/test", (req, res) => {
  res.json({
    message: "Api is working!",
  });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        // we want to respond with a cookie and an encrypted username
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.status(401).json({ error: "wrong password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "").json("true");
});

app.post("/upload-by-link", async (req, res) => {
  try{
    const { link } = req.body;

    if(!link){
        return res.status(400).json({error:'no link provided'});
    }

    const newName = "photo" + Date.now() + ".jpg";
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
  
    res.json(newName);
  }
  catch(err){
    console.error("Image Download Error:", err.message); 
    res.status(500).json({ error: "Failed to download image. Please check the link and try again"});
  }
});

const photosMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];    
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newName= 'photo'+Date.now() + "." + ext;
    const newPath=__dirname+"/uploads/"+newName;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newName);
  }
  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await PlaceModel.create({
        owner: userData.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      res.json(placeDoc);
    });
  }
});

app.get("/places", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { id } = userData;
      res.json(await PlaceModel.find({ owner: id }));
    });
  }
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await PlaceModel.findById(id));
});

app.delete("/remove-photo/:filename",(req,res)=>{
    const {filename}=req.params;
    const filepath=__dirname + "/uploads/" + filename;
    console.log(filepath);
    
    fs.unlink(filepath,(err)=>{
        if (err) {
            console.error("Error deleting file:", err);
            return res.status(500).json({ error: "Failed to delete photo" });
          }
          res.json({success:true,message:'Photo deleted successfully'});
    })
})

app.put("/places", async (req, res) => {
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await PlaceModel.findById(id);
      if (userData.id === placeDoc.owner.toString()) {        
        placeDoc.set({
          title,
          address,
          photos:addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
        });
        await placeDoc.save();
        res.json("ok");
      }
    });
  }
});

app.listen(4000);

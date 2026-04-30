const express = require("express");
const mongoose = require("mongoose");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {body, validationResult} = require("express-validator");
const authRoutes = require("./authRoutes.js");

app.use(express.json());


const userSchema = mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
})

const User = mongoose.model("User", userSchema);


connectDB = async () => {
    mongoose.connect("mongodb://127.0.0.1:27017/testDB")
    .then(()=>console.log("Connected to Database"))
    .catch(()=>console.log("Error while connecting to database"));
}

authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader) return res.status(401).send('No token provided');

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, "SECRET_KEY");
        req.user = decoded;
        next();
    } catch {
        res.status(401).send("Invalid Token");
    }

    next();
}


app.use("/api", authRoutes);

app.get("/profile", authMiddleware, (req,res) => {
    res.send("Profile access granted");
})

app.get("/", (req,res) => {
    res.send("App is up and running");
})

app.post("/register", [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min:6 }).withMessage('Minimum 6 characters required')
],async (req,res)=> {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let {email, password} = req.body;

    try {
        let exisitingUser = await User.findOne({email: email});

        if(exisitingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email: email,
            password: hashedPassword
        });

        const savedUser = await user.save();

        if(savedUser) {
            return res.status(201).json({message: "User registered successfully"})
        }   else {
            return res.status(401).json({message: "Error while saving user"});
        }

    } catch {
        console.log({message: "Internal server error"})
    }
})

app.post("/login", async (req,res) => {
    let {email, password} = req.body;

    try {
        const user = await User.findOne({email: email});

        if(!user) {
            return res.status(400).json("user doesn't exists");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json("Invalid credentails");
        }

        const token = jwt.sign(
            {email: email},
            "SECRET_KEY",
            { expiresIn: '1h' }
        )

        res.json({ token })

    } catch{
        res.status(400).json({message: "Internal Server error"});
    }
})

app.listen(3000, async ()=>{
    await connectDB()
    console.log("App is running on http://localhost:3000");
})
const User = require("../models/user");
const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");


// register

exports.register = async (req,res)=> {

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
};


//login

exports.login = async (req,res, next) => {
    let {email, password} = req.body;

    if(!email) return next(new AppError("Email is required", 400));
    if(!password) return next(new AppError("Password is required", 400));

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
            { expiresIn: '1hr' } 

            // expiresIn: 60  //60 seconds
            // expiresIn: "1m" // 1 minute
            // expiresIn: "1h" // 1 hour
            // expiresIn: "7d" // 7 days
        )

        res.json({ token })

    } catch{
        res.status(400).json({message: "Internal Server error"});
    }
};


// profile

exports.profile = (req,res) => {
    res.json({status: "Profile access granted", email: req.user.email});
};
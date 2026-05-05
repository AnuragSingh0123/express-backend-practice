const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.loginController = async (req,res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if(!user){
        return res.status(400).json({ message: "User not found" });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if(!isMatch) {
        return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
        {id: user._id},
        "SECRET_KEY",
        { expiresIn: '1hr' }
    );

    res.json({ token });
}

exports.registerController = async (req, res) => {
    const {email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        email: email,
        password: hashedPassword
    });

    const savedUser = await user.save();

    if(savedUser) {
        res.status(201).json({message: "User created successfully"});
    } else {
        res.status(400).json({message: "Internal Server error"});
    }
}
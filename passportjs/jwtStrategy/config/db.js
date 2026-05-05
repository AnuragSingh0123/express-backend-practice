const mongoose = require("mongoose");


connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/passportDB")
    .then(()=> console.log("Connected to Database"))
    .catch(()=>console.log("Error while connecting to database"));
}

module.exports = connectDB;
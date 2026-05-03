const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/testDB")
    .then(()=>console.log("Connected to Database"))
    .catch(()=>console.log("Error while connecting to database"));
}


module.exports = connectDB;
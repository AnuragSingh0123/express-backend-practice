const empData = require("./utils/empData");
const connectDB = require("./config/db");
const Employee = require("./models/employee");

const initDB = async () => {
    await connectDB();
    await Employee.insertMany(empData);
    console.log("Database initialized");
}

initDB();
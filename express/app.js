const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const errorHandler = require("./middleware/errorMiddleware");


const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/api/employee", employeeRoutes);

app.get("/", (req,res) => {
    res.send("App is up and running");
})

app.use(errorHandler);

const startServer = async () => {
    await connectDB();
    app.listen(3000, async ()=>{
        console.log("App is running on http://localhost:3000");
    });
}

startServer();
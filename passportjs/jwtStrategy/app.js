const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");

const app = express();

app.use(express.json());
app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/auth", require("./routes/authRoutes"));
app.use("/user", require("./routes/userRoutes"));

const startServer = async () => {
    await connectDB();
    app.listen(3000, () => {
        console.log("App is running on http://localhost:3000");
    })
}

startServer();
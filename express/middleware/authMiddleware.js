const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send("No token provided");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "SECRET_KEY");
        console.log(decoded);
        req.user = decoded;
        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};

module.exports = authMiddleware;
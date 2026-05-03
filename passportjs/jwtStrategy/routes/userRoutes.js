const router = require("express").Router();
const passport = require("passport");
const { userController } = require("../controllers/userController");

router.get("/profile", passport.authenticate("jwt", { session: false }), userController);

module.exports = router;
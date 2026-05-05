

exports.userController = (req, res) => {
        res.json({
            message: "Access Granted",
            user: req.user
        });
    };
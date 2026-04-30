const express = require("express");
const router = express.Router();


// router.get('/regsiter', )

router.get("/post", (req,res)=> {
    res.send("Posts");
})

module.exports = router;
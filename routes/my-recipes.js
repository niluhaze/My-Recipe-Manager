const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.render("my-recipes")
})

module.exports = router
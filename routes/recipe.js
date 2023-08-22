const express = require("express")
const router = express.Router()
const Recipe = require("../models/recipe")

router.get("/:url_name", async (req, res) => {
    res.render("recipe")
})

module.exports = router
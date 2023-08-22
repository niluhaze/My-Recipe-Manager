const express = require("express")
const router = express.Router()
const Recipe = require("../models/recipe")

//redirect unspecified recipe url to /myrecipes
router.get("/", async (req, res) => {
    res.redirect("/my-recipes")
})

router.get("/:url_name", async (req, res) => {
    res.render("recipe")
})

module.exports = router
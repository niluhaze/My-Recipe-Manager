const express = require("express")
const router = express.Router()
const Recipe = require("../models/recipe")
const getRecipe = require("../scripts/getRecipe")

//redirect unspecified recipe url to /my-recipes
router.get("/", (req, res) => {
    res.redirect("/my-recipes")
})

router.get("/:urlName", getRecipe, async (req, res) => {
    //get data via middleware function and send
    res.send(res.recipe)
})

module.exports = router
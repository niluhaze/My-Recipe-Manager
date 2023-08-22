const express = require("express")
const router = express.Router()
const Recipe = require("../models/recipe")

//redirect unspecified recipe url to /myrecipes
router.get("/", (req, res) => {
    res.redirect("/my-recipes")
})

router.get("/:url_name", (req, res) => {
    //for testing: return url_name
    res.send(req.params.url_name)
})

module.exports = router
const express = require("express")
const router = express.Router()
const Recipe = require("../models/recipe")

//redirect unspecified recipe url to /myrecipes
router.get("/", (req, res) => {
    res.redirect("/my-recipes")
})

router.get("/:urlName", (req, res) => {
    //for testing: return urlName
    res.send(req.params.urlName)
})

module.exports = router
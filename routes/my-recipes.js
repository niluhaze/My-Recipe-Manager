const express = require("express")
const router = express.Router()
const Recipe = require("../models/recipe")
const Scripts = require ("../scripts/database")

router.get("/", async (req, res) => {
    //try to get all recipes
    try {
        const recipes = await Recipe.find()
        res.json(Scripts.getRecipeListData(req.query))
    } catch (error) {
        //send error code 500 in case of server-side error
        res.status(500).json({message: error.message})
    }
})

module.exports = router
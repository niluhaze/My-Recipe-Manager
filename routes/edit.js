const express = require("express")
const router = express.Router()
const Recipe = require("../models/recipe")

//open edit page to create new recipe
router.get("/", (req, res) => {
    res.render("edit")
})

//open edit page of existing recipe
router.get("/:urlName", async (req, res) => {
    try {
        //retrieve data of corresponding recipe
        res.json(await Recipe.find({"urlName": req.params.urlName}).limit(1))
    } catch (error) {
        res.json({message: error.message})
    }
})

//post a new recipe
router.post("/", async (req, res) => {
    const recipe = new Recipe({
        urlName: req.body.urlName,
        recipeName: req.body.recipeName,
        cookTimeTotal: req.body.cookTimeTotal,
        cookTimeActive: req.body.cookTimeActive,
        dateAdded: req.body.dateAdded,
        tags: req.body.tags,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    })
    try {
        const newRecipe = await recipe.save()
        res.status(201).json(newRecipe)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router
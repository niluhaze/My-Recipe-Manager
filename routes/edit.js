const express = require("express")
const router = express.Router()
const Recipe = require("../models/recipe")

//open edit page to create new recipe
router.get("/", (req, res) => {
    res.render("edit")
})

//open edit page of existing recipe
router.get("/:url_name", (req, res) => {
    res.render("edit")
})

//post a new recipe
router.post("/", async (req, res) => {
    const recipe = new Recipe({
        url_name: req.body.url_name,
        recipe_name: req.body.recipe_name,
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

/* TBD 
function nameToUrlName(name){

    return name
} */

module.exports = router
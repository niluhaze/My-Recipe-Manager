const express = require("express")
const router = express.Router()
const Recipe = require("../models/recipe")

router.get("/", (req, res) => {
    res.render("edit")
})

router.get("/:url_name", (req, res) => {
    res.render("edit")
})

router.post("/", async (req, res) => {
    const recipe = new Recipe({
        url_name: req.body.url_name,
        name: req.body.name,
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
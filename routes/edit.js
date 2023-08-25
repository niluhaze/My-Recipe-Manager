const express = require("express")
const router = express.Router()
const Recipe = require("../models/recipe")
const getRecipe = require("../scripts/getRecipe")



//functions for creating new recipe under "/":
//open edit page to create new recipe
router.get("/", (req, res) => {
    res.render("edit")
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



//functions for editing existing recipe under "/urlName":
//open edit page of existing recipe
router.get("/:urlName", getRecipe, async (req, res) => {
    res.send(res.recipe)
})

router.delete("/:urlName", getRecipe, async (req, res) => {
    try {
        await res.recipe.remove() //remove recipe from database
        res.status(201).json({message: `Deleted recipe "${urlName}".`}) //respond with confirmation
    } catch (error) {
        res.status(500).send({message: error.message}) //
    }
})

module.exports = router
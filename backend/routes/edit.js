const express = require("express")
const router = express.Router()
const Recipe = require("../models/recipe")
const getRecipe = require("../scripts/getRecipe")
const database = require("../scripts/database")



//functions for creating new recipe under "/":
//open edit page to create new recipe
router.get("/", (req, res) => {
    res.json({message: "edit page"})
})

//post a new recipe
router.post("/", async (req, res) => {
    const newUrlName = await database.getNewUrlName(req.body.recipeName)
    const newDate = Date.now()

    const recipe = new Recipe({
        urlName: newUrlName,
        recipeName: req.body.recipeName,
        cookTimeTotal: req.body.cookTimeTotal,
        cookTimeActive: req.body.cookTimeActive,
        dateAdded: newDate,
        tags: req.body.tags,
        quantity: req.body.quantity,
        quantityUnit: req.body.quantityUnit,
        body: req.body.body,
        image: req.body.image
    })
    try {
        const newRecipe = await recipe.save()
        res.status(201).json({urlName: newRecipe.urlName})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})



//functions for editing existing recipe under "/urlName":
//open edit page of existing recipe
router.get("/:urlName", getRecipe, async (req, res) => {
    //get data via middleware function and send
    res.send(res.recipe)
})

router.delete("/:urlName", async (req, res) => {
    try {
        if (await database.checkIfUrlNameExists(req.params.urlName)) { //if the given urlName exists

            await Recipe.deleteOne({"urlName": req.params.urlName}) //remove recipe from database
            res.status(201).json({message: `Deleted recipe '${req.params.urlName}'`}) //respond with confirmation

        } else { //if the name doesn't exist
            res.status(404).json({message: `Recipe '${req.params.urlName}' not found`})
        }
        
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

module.exports = router
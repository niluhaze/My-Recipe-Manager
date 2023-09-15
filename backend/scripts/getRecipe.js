/*
A general middleware function which gets a recipe based on its urlName.
Used to avoid duplicate code for simple requests.
*/

const Recipe = require("../models/recipe")

const VARS_FOR_RECIPE_PAGE = { //specifies recipe variables needed for the recipe list
    _id: 0, __v: 0
    }

async function getRecipe (req, res, next) {
    let recipe
    try {
        //retrieve data of single recipe by urlName
        recipe = await Recipe.find({"urlName": req.params.urlName}, VARS_FOR_RECIPE_PAGE).limit(1)
        //respond with 404 error if no recipe by that name found
        if (recipe.length == 0){
            return res.status(404).json({message: `No recipe found with urlName "${req.params.urlName}".`})
        }
    } catch (error) { 
        //catch and respond to server side error
        return res.status(500).json({message: error.message})
    }
    res.recipe = recipe //add recipe to response object
    next() //move on to next piece of middleware or response method
}

module.exports = getRecipe
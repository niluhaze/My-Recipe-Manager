/*
A general middleware function which gets a recipe based on its urlName.
Used to avoid duplicate code for simple requests.
*/

const recipe = require("../models/recipe")
const Recipe = require("../models/recipe")

async function getRecipe (req, res, next) {
    try {
        //retrieve data of single recipe by urlName
        let recipe = await Recipe.find({urlName: req.params.urlName}).limit(1)
        //respond with 404 error if no recipe by that name found
        if (recipe == null){
            return res.status(404).json({message: `No recipe found with urlName "${req.params.urlName}".`})
        }
    } catch (error) { 
        //catch and respond to server side error
        return res.status(500).json({message: error.message})
    }
    res.recipe = recipe //add subscriber to response object
    next() //move on to next piece of middleware or response method
}

module.exports = getRecipe
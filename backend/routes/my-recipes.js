const express = require("express")
const router = express.Router()
const Recipe = require("../models/recipe")
const database = require('../scripts/database')

router.get("/", async (req, res) => {
    try {
        const recipes = await database.getRecipeListData(req.query)
        console.log(recipes)
        res.json(recipes)
    } catch (error) {
        res.json({message: error.message})
        /* if (error.message = 400){
            //send error code 400 in case of caught client-side error
            res.status(400).json({message: error.message})
        } else {    
            //send error code 500 in case of server-side error
            res.status(500).json({message: error.message})
        } */
    }
})

module.exports = router
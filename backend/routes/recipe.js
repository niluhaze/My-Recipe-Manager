/* 
  Route for getting the data of a specific recipe.
  "/recipe"
*/

const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const getRecipe = require("../scripts/getRecipe");

router.get("/:urlName", getRecipe, async (req, res) => {
  //get data via middleware function and send
  res.send(res.recipe);
});

module.exports = router;

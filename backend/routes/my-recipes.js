const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const database = require("../scripts/database");

router.get("/", async (req, res) => {
  try {
    const recipes = await database.getRecipeListData(req.query);
    console.log(`my-recipes: retrieved ${recipes.length} recipe(s).`);
    res.json(recipes);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;

/* 
  Route for getting a list of partial recipe data matching search criteria.
  Intended for "/my-recipes".
*/

const express = require("express");
const router = express.Router();
const database = require("../scripts/database");

router.get("/", async (req, res) => {
  try {
    const recipes = await database.getRecipeListData(req.query);
    res.json(recipes);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;

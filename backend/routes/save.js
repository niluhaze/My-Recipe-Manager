/* 
  Routes for saving and unsaving recipes.
  "/save/urlName"
*/

const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const database = require("../scripts/database");

router.post("/:urlName", async (req, res) => {
  const urlName = req.params.urlName;
  
  try {
    // check if recipe exists
    if (!(await database.checkIfUrlNameExists(urlName))) {
      return res.status(404).json({ message: `Recipe '${urlName}' not found` });
    } 
    // find the recipe with the matching (potentially old) urlName and update it with recipe
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { urlName: urlName }, // condition
      {
        // update saved value with value from request
        saved: req.body.saved,
      },
      { new: true } // options: return new instead of old recipe data
    );
    res.status(200).json({
      urlName: updatedRecipe.urlName,
      saved: updatedRecipe.saved,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

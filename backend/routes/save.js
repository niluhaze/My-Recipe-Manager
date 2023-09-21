/* 
  Routes for saving and unsaving recipes.
  "/save/urlName"
*/

const express = require("express");
const Recipe = require("../models/recipe");
const router = express.Router();

router.post("/:urlName", async (req, res) => {
  const urlName = req.params.urlName;
  console.log(req.body)
  console.log("save:", urlName, "as", req.body.saved);
  try {
    // find the recipe with the matching (potentially old) urlName and update it with recipe
    const newRecipe = await Recipe.findOneAndUpdate(
      { urlName: urlName }, // condition
      {
        // update saved value with value from request
        saved: req.body.saved,
      },
      { new: true } // options: return new instead of old recipe data
    );
    res.status(200).json({
      urlName: newRecipe.urlName,
      saved: newRecipe.saved,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

/* 
  Routes for editing existing and creating new recipes.
  "/edit" and "/edit/urlName"
*/

const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const database = require("../scripts/database");

// route for posting a new recipe under "/edit":
router.post("/", async (req, res) => {
  
  try {
    const newUrlName = await database.getNewUrlName(req.body.recipeName);
    const newDate = Date.now();

    const recipe = new Recipe({
      urlName: newUrlName,
      recipeName: req.body.recipeName,
      cookTimeTotal: req.body.cookTimeTotal,
      cookTimeActive: req.body.cookTimeActive,
      dateAdded: newDate,
      tags: req.body.tags,
      quantity: req.body.quantity,
      quantityUnit: req.body.quantityUnit,
      ingredients: req.body.ingredients,
      body: req.body.body,
      image: req.body.image,
    });

    const updatedRecipe = await recipe.save();
    res.status(201).json({ urlName: updatedRecipe.urlName });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// route for editing an existing recipe under "/edit/urlName":
router.post("/:urlName", async (req, res) => {
  const urlName = req.params.urlName;

  try {
    // check if recipe exists
    if (!(await database.checkIfUrlNameExists(urlName))) {
      return res.status(404).json({ message: `Recipe '${urlName}' not found` });
    }
    const newUrlName = await database.getNewUrlNameAfterEdit(
      // urlName can change when title changes
      req.body.recipeName, // new recipe name
      urlName // old url name
    );
    // find the recipe with the matching (potentially old) urlName and update it with recipe
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { urlName: urlName }, // condition
      {
        // update
        urlName: newUrlName,
        recipeName: req.body.recipeName,
        cookTimeTotal: req.body.cookTimeTotal,
        cookTimeActive: req.body.cookTimeActive,
        tags: req.body.tags,
        quantity: req.body.quantity,
        quantityUnit: req.body.quantityUnit,
        ingredients: req.body.ingredients,
        body: req.body.body,
        image: req.body.image,
      },
      { new: true } // options: return new instead of old recipe data
    );
    res.status(200).json({ urlName: updatedRecipe.urlName });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// route for deleting a specific recipe under "/edit/urlName":
router.delete("/:urlName", async (req, res) => {
  const urlName = req.params.urlName;
  try {
    // check if recipe exists
    if (!(await database.checkIfUrlNameExists(urlName))) {
      return res.status(404).json({ message: `Recipe '${urlName}' not found` });
    } 
    await Recipe.deleteOne({ urlName: req.params.urlName }); //remove recipe from database
    res
      .status(200)
      .json({ message: `Deleted recipe '${req.params.urlName}'` }); //respond with confirmation
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;

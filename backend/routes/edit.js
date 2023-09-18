const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const getRecipe = require("../scripts/getRecipe");
const database = require("../scripts/database");

//functions for creating new recipe under "/":
//open edit page to create new recipe
router.get("/", (req, res) => {
  res.json({ message: "edit page" });
});

//post a new recipe
router.post("/", async (req, res) => {
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
    body: req.body.body,
    image: req.body.image,
  });
  try {
    const newRecipe = await recipe.save();
    res.status(201).json({ urlName: newRecipe.urlName });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//post a new recipe
router.post("/", async (req, res) => {
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
  console.log("edit-new:", newUrlName)
  try {
    const newRecipe = await recipe.save();
    res.status(201).json({ urlName: newRecipe.urlName });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//functions for editing existing recipe under "/urlName":
//open edit page of existing recipe
router.get("/:urlName", getRecipe, async (req, res) => {
  //get data via middleware function and send
  res.send(res.recipe);
});

//edit an existing recipe
router.post("/:urlName", async (req, res) => {
  const urlName = req.params.urlName;
  console.log("urlName:", urlName)
  /* 
    Check if the name was changed to require a new urlName.
    If the urlName from the post request url doesn't match the urlName from the request body,
    the title was edited and a new urlName needs to be generated, else it stays the same.
  */
  const urlNameFromReq = database.convertToUrlName(req.body.recipeName);
  let newUrlName = urlName;
  if (!urlName.includes(urlNameFromReq)) {
    newUrlName = await database.getNewUrlName(urlNameFromReq);
  }
  console.log("edit-existing:", urlName, "to", newUrlName)
  try {
    // find the recipe with the matching (potentially old) urlName and update it with recipe
    const newRecipe = await Recipe.findOneAndUpdate(
        { urlName: urlName }, // condition
        { // update
          urlName: newUrlName,
          recipeName: req.body.recipeName,
          cookTimeTotal: req.body.cookTimeTotal,
          cookTimeActive: req.body.cookTimeActive,
          dateChanged: Date.now(),
          tags: req.body.tags,
          quantity: req.body.quantity,
          quantityUnit: req.body.quantityUnit,
          ingredients: req.body.ingredients,
          body: req.body.body,
          image: req.body.image,
        },
        { new: true } // options: return new instead of old recipe data
    );
    res.status(201).json({ urlName: newRecipe.urlName });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:urlName", async (req, res) => {
  try {
    if (await database.checkIfUrlNameExists(req.params.urlName)) {
      //if the given urlName exists

      await Recipe.deleteOne({ urlName: req.params.urlName }); //remove recipe from database
      res
        .status(201)
        .json({ message: `Deleted recipe '${req.params.urlName}'` }); //respond with confirmation
    } else {
      //if the name doesn't exist
      res
        .status(404)
        .json({ message: `Recipe '${req.params.urlName}' not found` });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;

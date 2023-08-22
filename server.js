const express = require("express")
const app = express();

app.set("view engine", "ejs") //set to use ejs as the view engine

app.get("/", (req, res) => {
    res.redirect("/my-recipes")
})

const myRecipesRouter = require("./routes/my-recipes")
const recipeRouter = require("./routes/recipe")

app.use("/my-recipes", myRecipesRouter)
app.use("/recipe", recipeRouter)

app.listen(3000)
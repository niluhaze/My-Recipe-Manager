/*
This is the main backend file.
*/

//dev requirements
require("dotenv").config()

//specify requirements
const express = require("express")
const app = express()

const mongoose = require("mongoose")

app.use(express.json()) //let server accept json

//connect to mongoDB database on localhost
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true}) 
const db = mongoose.connection
db.on("error",(error) => console.error(error)) //log errors in console
db.once("open", () => console.log("Established connection to MongoDB")) //log when connection to database is established

app.set("view engine", "ejs") //set to use ejs as the view engine

//redirect "/" to "/my-recipes"
app.get("/", (req, res) => {
    res.redirect("/my-recipes")
})

//create and apply routings for the different pages
const editRouter = require("./routes/edit")
const myRecipesRouter = require("./routes/my-recipes")
const recipeRouter = require("./routes/recipe")

app.use("/edit", editRouter)
app.use("/my-recipes", myRecipesRouter)
app.use("/recipe", recipeRouter)

//tell server to listen on specified port
app.listen(3000, () => console.log("Server Started"))
/*
This is the main backend file.
*/

//dev requirements
require("dotenv").config()

//specify requirements
const express = require("express")
const bodyParser = require('body-parser');
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

// Increase the maximum payload size
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173" })) //allows queries from localhost

//connect to MongoDB database on localhost
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true}) 
const db = mongoose.connection
db.on("error",(error) => console.error(error)) //log errors in console
db.once("open", () => console.log("Established connection to MongoDB")) //log when connection to database is established

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
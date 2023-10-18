/*
  This is the main backend file.
*/

// dev requirements
require("dotenv").config();

// specify requirements
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Increase the maximum payload size
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "http://127.0.0.1:5173" }));

// connect to MongoDB database on localhost
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Established connection to MongoDB"));

// redirect "/" to "/my-recipes"
app.get("/", (req, res) => {
  res.redirect("/my-recipes");
});

// create and apply routings for the different pages
const editRouter = require("./routes/edit");
const myRecipesRouter = require("./routes/my-recipes");
const recipeRouter = require("./routes/recipe");
const saveRouter = require("./routes/save");

app.use("/edit", editRouter);
app.use("/my-recipes", myRecipesRouter);
app.use("/recipe", recipeRouter);
app.use("/save", saveRouter);

// tell server to listen on specified port and local ip
app.listen(process.env.BACKEND_PORT, process.env.BACKEND_IP, () => console.log("Server Started"));

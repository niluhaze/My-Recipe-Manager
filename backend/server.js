/*
  This is the main backend file.
*/

// dev requirements
require("dotenv").config();

// specify requirements
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Increase the maximum payload size
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const corsSettings = { origin: `${process.env.FRONTEND_URL}` };
console.log("cors settings set to:", corsSettings);
app.use(cors(corsSettings));

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

var server = http.createServer(app);

// try to start server listener with 3 different sets of parameters
const startParameters = [
  {
    parameters: [process.env.BACKEND_PORT, process.env.BACKEND_IP],
    errorMessage:
      "Could not start server on default ip, listening on all local ips instead.",
  },
  {
    parameters: [process.env.BACKEND_PORT],
    errorMessage:
      "Could not start server on default port, trying to choose free port instead.",
  },
  {
    parameters: [],
    errorMessage: "Could not start server at all.",
  },
];

// run listener functions
const iterateStartParameters = (parameterNumber = 0) => {
  server.on("error", (error) => {
    if (error.code !== "EADDRINUSE" && parameterNumber + 1 < startParameters.length) {
      console.log("An unexpected error happened, trying error handling for known startup error \"EADDRINUSE\" anyways.")
    }
    console.log(startParameters[parameterNumber].errorMessage);
    if (parameterNumber + 1 < startParameters.length) {
      iterateStartParameters(parameterNumber + 1);
    }
  });
  server.listen(
    ...startParameters[parameterNumber].parameters,
    () => {
      console.log("Server started, listening on:", server.address());
    });
};
 
iterateStartParameters();
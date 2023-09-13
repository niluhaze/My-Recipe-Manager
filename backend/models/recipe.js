//recipe schema, specifying the variables a recipe object should have
const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
    urlName:{
        type: String,
        required: true
    },
    recipeName:{
        type: String,
        required: true
    },
    cookTimeTotal:{
        type: Number,
        required: true,
        default: 0
    },
    cookTimeActive:{
        type: Number,
        required: true,
        default: 0
    },
    dateAdded:{
        type: Date,
        required: true,
        default: Date.now
    },
    tags:{
        type: Array,
        default: []
    },
    quantity:{
        type: Number
    },
    quantityUnit:{
        type: String
    },
    body:{
        type: Array,
        required: true,
        default: ""
    },
    image:{
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("Recipe", recipeSchema)
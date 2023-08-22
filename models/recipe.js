//recipe schema, specifying the variables a recipe object should have
const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    cookTimeTotal:{
        type: Number,
        required: true
    },
    cookTimeActive:{
        type: number,
        required: true
    },
    dateAdded:{
        type: Date,
        required: true,
        default: Date.now
    },
    tags:{
        type: Array,
        required: true,
        default: []
    },
    ingredients:{
        type: Array,
        required: true,
    },
    instructions:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Recipe", recipeSchema)
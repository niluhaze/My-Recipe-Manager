/*
This contains scripts related to the MongoDB database.
*/

const recipes_per_page = 20

const unidecode = require("unidecode")
const Recipe = require("../models/recipe")

//return true if a specific url name already exists
async function checkIfUrlNameExists(url_name_to_check){

    try {
        if (await Recipe.find({url_name: url_name_to_check}).limit(1).size() > 0){
            return true
        }
    } catch (error) {
        throw 500
    }
    return false

}

//generate a url name from a recipe name
function getNewUrlName(recipe_name){

    //clean up string a bit
    recipe_name = recipe_name.trim().toLowerCase()
    recipe_name = unidecode(recipe_name) //decodes any special unicode chars like umlauts to ascii
    recipe_name = recipe_name.replace(/ /g,"-").replace //replace spaces with -
    recipe_name = recipe_name.replace(/^a-z-/g, "") //remove everything that is not a roman letter or -

    //if recipe name already exists in a different object, add "-i" after it
    //finds lowest i which doesn't exist yet
    if (checkIfUrlNameExists(recipe_name)){
        i = 2
        while(true){
            recipe_name_i = recipe_name + " " + i
            //if unique name found, return recipe_name_i
            if(!checkIfUrlNameExists(recipe_name_i)){
                return recipe_name_i
            }
            i++
        }
    }
    return recipe_name
}

/* generates the query that will go inside the Recipe.find() method
to find a list of recipes matching the filter parameters given in query_json */
function generateRecipeListQuery(query_json){
    try {

        var query = "{" //start with {}

        /* TODO: filter recipe names by search
        if (query_json.search != null){

        }*/

        //filter by tags if given
        if (query_json.tags != null && query_json.tags != []){ 
            query += `tags: {$all: ${query_json.tags} },`
        }

        //if last char in query is a comma, remove it
        if (query[query.slice(-1)] == ","){
            query = query.slice(0,-1)
        }

        return query + "}" //end with }

    } catch (error) {
        throw 400
    }
    
     
}

//returns the amount of recipes that fit the given filter
async function getRecipeListAmount(query_json){
    return await Recipe.find(generateRecipeListQuery(query_json)).count()
}


async function getRecipeListData(query_json){
    const query_count = getRecipeListAmount(query_json) //get amount of recipes that fit the filter
    const pages_amount = Math.round(query_count/recipes_per_page) //get the amount of resulting pages
    //TODO: sort: query_json.sort_by: query_json.sort_direction, 
    return await Recipe.find(generateRecipeListQuery(query_json)).sort({name: 1}).skip(recipes_per_page * query_json.page || 0).limit(recipes_per_page) 
}

module.exports = {
    checkIfUrlNameExists, getNewUrlName, getRecipeListData
}
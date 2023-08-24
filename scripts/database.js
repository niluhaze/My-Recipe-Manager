/*
This contains scripts related to the MongoDB database.
*/

const RECIPES_PER_PAGE = 20; //number of recipes per /my-recipes page
VARS_FOR_RECIPE_LIST = { //specifies recipe variables needed for the recipe list
url_name: 1, recipe_name: 1, cookTimeTotal: 1, cookTimeActive: 1, _id: 0
};

const unidecode = require("unidecode");
const Recipe = require("../models/recipe");

//return true if a specific url name already exists
async function checkIfUrlNameExists(urlNameToCheck){

    try {
        if (await Recipe.find({url_name: urlNameToCheck}).limit(1).size() > 0){
            return true
        }
    } catch (error) {
        throw 500
    }
    return false

}

//generate a url name from a recipe name
async function getNewUrlName(recipe_name){

    //clean up string a bit
    recipe_name = recipe_name.trim().toLowerCase()
    recipe_name = unidecode(recipe_name) //decodes any special unicode chars like umlauts to ascii
    recipe_name = recipe_name.replace(/ /g,"-").replace //replace spaces with -
    recipe_name = recipe_name.replace(/^a-z-/g, "") //remove everything that is not a roman letter or -

    //if recipe name already exists in a different object, add "-i" after it
    //finds lowest i which doesn't exist yet
    if (await checkIfUrlNameExists(recipe_name)){
        i = 2
        while(true){
            recipe_name_i = recipe_name + " " + i
            //if unique name found, return recipe_name_i
            if(await !checkIfUrlNameExists(recipe_name_i)){
                return recipe_name_i
            }
            i++
        }
    }
    return recipe_name
}

/* generates the query that will go inside the Recipe.find() method
to find a list of recipes matching the filter parameters given in query */
function generateRecipeListQuery(query){
    try {

        var query = "{" //start with {}

        /* TODO: filter recipe names by search
        if (query.search != null){

        }*/

        //filter by tags if given
        if (query.tags != null && query.tags != []){ 
            query += `tags: {$all: ${query.tags} },`
        }

        //if last char in query is a comma, remove it
        if (query[query.slice(-1)] == ","){
            query = query.slice(0,-1)
        }

        query += "}" //end with }

        console.log("QUERY:\n" + query)
        return JSON.parse(query) //convert string to json and return

    } catch (error) {
        console.log(error)
        throw error
    }
    
}

//returns the amount of recipes that fit the given filter
async function getRecipeListAmount(query){
    return await Recipe.find(generateRecipeListQuery(query)).count()
}

//get a json of the required recipe data for the /my-recipes list
async function getRecipeListData(query){

    const query_count = await getRecipeListAmount(query) //get amount of recipes that fit the filter
    const pages_amount = Math.round(query_count/RECIPES_PER_PAGE) //get the amount of resulting pages
    //TODO: sort: query.sort_by: query.sort_direction,
    //retrieve needed recipe data given the filters, sort type and page number
    //recipes = await Recipe.find()
    //console.log("RECIPES:\n" + recipes)
    //return recipes
    recipes = await Recipe.find(/* generateRecipeListQuery(query) */{}, VARS_FOR_RECIPE_LIST)/* .sort({name: 1}).skip(RECIPES_PER_PAGE * query.page || 0).limit(RECIPES_PER_PAGE) */
    //console.log("RECIPES:\n" + recipes)
    return recipes
}

module.exports = {
    checkIfUrlNameExists, getNewUrlName, getRecipeListData
}
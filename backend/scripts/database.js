/*
This contains scripts related to the MongoDB database.
*/

const RECIPES_PER_PAGE = 20 //number of recipes per /my-recipes page
const VARS_FOR_RECIPE_LIST = { //specifies recipe variables needed for the recipe list
urlName: 1, recipeName: 1, cookTimeTotal: 1, cookTimeActive: 1, _id: 0
}

const unidecode = require("unidecode")
const Recipe = require("../models/recipe")


//return true if a specific url name already exists
async function checkIfUrlNameExists(toCheck){

    try {
        if (await Recipe.find({urlName: toCheck}).limit(1).count() == 0){ //if no object matches the urlName
            return false
        }
    } catch (error) {
        throw error
    }
    //else
    return true 

}

//generate a valid url name from a recipe name
async function getNewUrlName(recipeName){

    console.log("recipeName: " + recipeName)

    //clean up string a bit
    const urlName = 
    unidecode(recipeName) //decodes any special unicode chars like umlauts to ascii characters
    .trim() //removes leading and trailing spaces
    .toLowerCase() 
    .replace(/ /g,"-") //replace spaces with -
    .replace(/^a-z-/g, "") //remove everything that is not a roman letter or -

    console.log("urlName: " + urlName)

    //if recipe name already exists in a different object, append a trailing number "-i"
    //finds lowest i which doesn't exist yet
    if (await checkIfUrlNameExists(urlName)){
        let i = 2
        while(true){
            var urlName_i = urlName + "-" + i
            console.log("urlName_i: " + urlName_i)
            //if unique name found, return urlName_i
            if(!(await checkIfUrlNameExists(urlName_i))){
                return urlName_i
            }
            i++
        }
    }
    return urlName //return urlName if adding a trailing number is not needed
}

//takes array of strings which form json "key: value" pairs and uses them to create a json
function createJson(jsonParts) {

    let jsonString = "{" //start with {

    for (i in jsonParts) {

        jsonString += jsonParts[i] //add key:value pair

        if(i < jsonParts.length - 1){ //if another pair follows, add a comma
            jsonString += ","
        }

    }

    jsonString += "}" //end with }

    return JSON.parse(jsonString)
}

/* generates the query that will go inside the Recipe.find() method
to find a list of recipes matching the filter parameters given in query */
function generateRecipeListFindEntry(query){
    try {

        jsonParts = []

        /* TODO: filter recipe names by search
        if (query.search != null){

        }*/

        //filter by tags if given
        if (query.tags != null && query.tags != []){
            jsonParts.push(`tags: {$all: ${query.tags}}`)
        }

        return createJson(jsonParts) //create json from parts and return

    } catch (error) {
        throw error
    }

}

//determine how many recipes to skip in the following query depending on which page was queried
function generateRecipeListSkipEntry(query) { 

    if (query.page == null || query.page <= 0) {
        return 0 //skip none if no page given, or if page value is not positive
    } else {
        return RECIPES_PER_PAGE * (query.page-1) //skip elements of previous pages if page number given
    }

}

//determine by which variables to sort the recipes depending on the query
function generateRecipeListSortEntry(query){
    try {

        if (query.sortBy == null || !(query.sortDir == 1 || query.sortDir == -1)){

            return {"dateAdded":1 ,"name" :1} //default sorting if no (valid) query given

        } else {

            let jsonParts = [] //build custom sort json based on query
            jsonParts.push(`"${query.sortBy}": "${query.sortDir}"`)

            //include the following if they are not already included in the query
            if (query.sortBy != "dateAdded"){ jsonParts.push('"dateAdded": "1"')}
            if (query.sortBy != "recipeName"){ jsonParts.push('"recipeName": "1"')}

            return createJson(jsonParts)
        }

    } catch (error) {
        throw error
    }
}

//returns the amount of recipes that fit the given filter
async function getRecipeListAmount(query){
    return await Recipe.find(generateRecipeListFindEntry(query)).count()
}

//get a json of the required recipe data for the /my-recipes list
async function getRecipeListData(query){

    try {

        const query_count = await getRecipeListAmount(query) //get amount of recipes that fit the filter
        const pages_amount = Math.round(query_count/RECIPES_PER_PAGE) //get the amount  of resulting pages

        //TODO: sort: query.sort_by: query.sort_direction,
        //retrieve needed recipe data given the filters, sort type and page number
        recipes = await Recipe
        .find(
            generateRecipeListFindEntry(query), //find objects which match the query
            VARS_FOR_RECIPE_LIST //and only include the relevant vars for the recipe list
        )
        .sort(generateRecipeListSortEntry(query)) //specify how elements are sorted
        .skip(generateRecipeListSkipEntry(query)) //skip elements of previous pages
        .limit(RECIPES_PER_PAGE) //only retrieve elements needed for current page
        return recipes

    } catch (error) {
        throw error
    }
}

module.exports = {
    RECIPES_PER_PAGE, checkIfUrlNameExists, getNewUrlName, getRecipeListAmount, getRecipeListData
}
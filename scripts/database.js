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

module.exports = {
    checkIfUrlNameExists, getNewUrlName
}
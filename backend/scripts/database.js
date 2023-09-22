/*
  This contains scripts related to the MongoDB database.
*/

const unidecode = require("unidecode");
const Recipe = require("../models/recipe");

const RECIPES_PER_PAGE = 24; // number of recipes per /my-recipes page
// specifies variables needed for the recipe list
const VARS_FOR_RECIPE_LIST = {
  urlName: 1,
  recipeName: 1,
  saved: 1,
  cookTimeTotal: 1,
  cookTimeActive: 1,
  image: 1,
  _id: 0,
};

// clean up the given string for use in a url
function convertToUrlName(recipeName) {
  const urlName = unidecode(recipeName) // decode any special unicode chars like umlauts to ascii characters
    .trim() // remove leading and trailing spaces
    .toLowerCase()
    .replace(/ /g, "-") // replace spaces with -
    .replace(/^a-z-/g, ""); // remove everything that is not a roman letter or -
  return urlName;
}

// return true if a specific url name already exists
async function checkIfUrlNameExists(toCheck) {
  try {
    if ((await Recipe.find({ urlName: toCheck }).limit(1).count()) == 0) {
      //if no object matches the urlName
      return false;
    }
  } catch (error) {
    throw error;
  }
  //else
  return true;
}

// generate a valid url name from a recipe name
async function getNewUrlName(recipeName) {
  const urlName = convertToUrlName(recipeName);

  // if recipe name already exists in a different object, append a trailing number "-i"
  // finds lowest i which doesn't exist yet
  if (await checkIfUrlNameExists(urlName)) {
    let i = 2;
    while (true) {
      var urlName_i = urlName + "-" + i;
      // if unique name found, return urlName_i
      if (!(await checkIfUrlNameExists(urlName_i))) return urlName_i;
      i++;
    }
  }
  return urlName; // return urlName if adding a trailing number is not needed
}

// same as previous function, but if at any point urlName_i matches oldUrlName, return oldUrlName
async function getNewUrlNameAfterEdit(recipeName, oldUrlName) {
  const urlName = convertToUrlName(recipeName);
  if (urlName == oldUrlName) return oldUrlName; // new matches old, return old

  // if recipe name already exists in a different object, append a trailing number "-i"
  // finds lowest i which doesn't exist yet
  if (await checkIfUrlNameExists(urlName)) {
    let i = 2;
    while (true) {
      var urlName_i = urlName + "-" + i;
      // if new matches old, return old
      if (urlName == oldUrlName) return oldUrlName;
      // if unique name found, return urlName_i
      if (!(await checkIfUrlNameExists(urlName_i))) return urlName_i;
      i++;
    }
  }
  return urlName; // return urlName if adding a trailing number is not needed
}

// takes array of strings which form json "key: value" pairs and uses them to create a json
function createJson(jsonParts) {
  let jsonString = "{"; // start with {

  for (i in jsonParts) {
    jsonString += jsonParts[i]; // add key:value pair

    if (i < jsonParts.length - 1) {
      // if another pair follows, add a comma
      jsonString += ",";
    }
  }

  jsonString += "}"; // end with }

  return JSON.parse(jsonString);
}

/* 
  Generates the query that will go inside the Recipe.find() method
  to find a list of recipes matching the filter parameters given in query.
*/
function generateRecipeListFindEntry(query) {
  try {
    const findJSON = {};

    // filter by search string if given
    if (query.search != undefined) {
      findJSON.recipeName = { $regex: query.search, $options: "i" };
    }

    // filter by saved if given
    if (query.saved != undefined) {
      if (query.saved === "true") findJSON.saved = true;
      else if (query.saved === "false") findJSON.saved = false;
    }

    // filter by tags if given
    if (query.tags != undefined) {
      /*
        A comment on passing the tags array through the url query:
        Since we want to be able to select multiple tags to search for at once,
        we will pass them through the url query like "?tags=vegan&tags=oriental".
        Express will combine these as an array ["vegan", "oriental"],
        whereas a single tag "?tags=vegan" will result in the string "vegan" in Express.
        According to the docs and my tests, the MongoDB $all tag handles both of these data types.
      */
        findJSON.tags = {$all: query.tags};
    }

    return findJSON;
  } catch (error) {
    throw error;
  }
}

// determine how many recipes to skip in the following query depending on which page was queried
function generateRecipeListSkipEntry(query) {
  if (query.page == null || query.page <= 0) {
    return 0; // skip none if no page given, or if page value is not positive
  } else {
    return RECIPES_PER_PAGE * (query.page - 1); // skip elements of previous pages if page number given
  }
}

// determine by which variables to sort the recipes depending on the query
function generateRecipeListSortEntry(query) {
  try {
    console.log("sortBy", query.sortBy);
    // if no (valid) sortBy given in query
    if (query.sortBy == undefined || query.sortBy.length < 1) {
      return { dateAdded: -1, name: 1 }; // resort to default sorting
    }
    let sortDirection = 1; // set default sort direction
    // The search direction can be reversed with a leading "-", check if this is the case
    console.log(query.sortBy.charAt(0), query.sortBy.charAt(0) === "-");
    if (query.sortBy.charAt(0) === "-") {
      console.log("reverse");
      // if this is the case, remove leading "-" and set search direction accordingly
      query.sortBy = query.sortBy.substring(1, query.sortBy.length);
      sortDirection = -1;
    }

    let jsonParts = []; // build custom sort json based on query
    jsonParts.push(`"${query.sortBy}": "${sortDirection}"`);

    // include the following if they are not already included in the query
    if (query.sortBy != "dateAdded") {
      jsonParts.push('"dateAdded": "1"');
    }
    if (query.sortBy != "recipeName") {
      jsonParts.push('"recipeName": "1"');
    }
    return createJson(jsonParts);
  } catch (error) {
    throw error;
  }
}

// returns the amount of recipes that fit the given findEntry filter
async function getRecipeListAmount(findEntry) {
  return await Recipe.find(findEntry).count();
}

// get a json of the required recipe data for the /my-recipes list
async function getRecipeListData(query) {
  try {
    const findEntry = generateRecipeListFindEntry(query); // filter recipes
    const sortEntry = generateRecipeListSortEntry(query); // specify how elements are sorted
    const skipEntry = generateRecipeListSkipEntry(query); // skip elements of previous pages

    console.log("find, sort, skip entries:", findEntry, sortEntry, skipEntry);

    const query_count = await getRecipeListAmount(findEntry); //get amount of recipes that fit the filter
    const pages_amount = Math.round(query_count / RECIPES_PER_PAGE); //get the amount  of resulting pages

    // retrieve needed recipe data given the filters, sort type and page number
    var recipes = await Recipe.find(
      findEntry, // find recipes which match the findEntry filter
      VARS_FOR_RECIPE_LIST // and only include the relevant vars for the recipe list
    )
      .sort(sortEntry)
      .skip(skipEntry)
      .limit(RECIPES_PER_PAGE); // only retrieve number of elements needed for current page
    return recipes;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  RECIPES_PER_PAGE,
  convertToUrlName,
  checkIfUrlNameExists,
  getNewUrlName,
  getNewUrlNameAfterEdit,
  getRecipeListAmount,
  getRecipeListData,
};

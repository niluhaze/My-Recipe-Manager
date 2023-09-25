/* 
  Returns a list/array of all the tags in tags.json
  Tags are stored in the form of a json object and categorized, this essentially removes these categories.
*/

import tags from "../assets/tags.json";

export const getTagList = () => {
  let tagList = [];
  for (var category in tags) {
    tagList = tagList.concat(tags[category]);
  }
  return tagList;
};
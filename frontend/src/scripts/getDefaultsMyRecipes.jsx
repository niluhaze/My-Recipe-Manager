/* 
  Return a JSON with all default values for the filter inputs on /my-recipes
*/

import { getValue, getValueTags } from "./getValue";
import { getTagList } from "./getTagList";

export const getDefaultsMyRecipes = (searchParamsJSON) => {
  let defaultValues = { tags: {} };

  // add variable with specified key to defaults
  const addToDefaults = (keyName) => {
    defaultValues[keyName] = getValue({ data: searchParamsJSON, key: keyName });
  };
  // add tag with specified name to defaults
  const addToDefaultsTag = (tagName) => {
    defaultValues.tags[tagName] = getValueTags({
      tagArray: searchParamsJSON.tags,
      tag: tagName,
    });
  };

  // add the following keys to default values
  const toBeAdded = ["search", "saved", "sortBy"];
  for (const key of toBeAdded) {
    addToDefaults(key);
  }

  // do the equivalent for the tags
  const toBeAddedTags = getTagList();
  for (const tag of toBeAddedTags) {
    addToDefaultsTag(tag);
  }
  
  return defaultValues;
};

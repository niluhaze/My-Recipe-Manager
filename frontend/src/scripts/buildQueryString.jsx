/*
  Used to build a query string form given data extracted from a form.
*/

export const buildQueryString = (formJSON) => {
  let newQueryString = "";

  // add key-value pairs to search string
  const addToQueryString = (key, value) => {
    if (newQueryString.length > 0) newQueryString += "&"; // add "&" between key-value pairs
    newQueryString += `${key}=${value}`;
  };

  // add SortBy
  addToQueryString("sortBy", formJSON.sortBy);
  // add Saved if marked as true
  if (formJSON.saved == "on") addToQueryString("saved", true);
  // add Search if query entered
  if (formJSON.search.length > 0) addToQueryString("search", formJSON.search);
  // add all selected Tags
  for (const tag of formJSON.tags) {
    addToQueryString("tags", tag);
  }
  return newQueryString;
};
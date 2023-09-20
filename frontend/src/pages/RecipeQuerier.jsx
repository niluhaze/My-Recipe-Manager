/*
  Query the data for the requested recipe page and then call the page with the queried data.
  "/recipe/urlName"
*/

import { useParams, Navigate } from "react-router-dom";
import { Recipe } from "./Recipe";
import { doGetQuery } from "../scripts/query";

export const RecipeQuerier = () => {
  const { urlName } = useParams();

  // query the recipe data
  const recipeQuery = doGetQuery("recipe", "/recipe/" + urlName);

  if (recipeQuery.isLoading) return <h1>Loading...</h1>;
  if (recipeQuery.isError) {
    try {
      console.log(recipeQuery.error.response.status);
      if (recipeQuery.error.response.status == 404)
        return <Navigate to="/not-found" />;
    } catch (error) {
      console.log(error);
    }
    return <pre>{JSON.stringify(recipeQuery.error)}</pre>;
  }

  const data = recipeQuery.data[0];

  /* 
    A unique key tells React to rerender the Recipe, otherwise it might show old data after an edit.
  */
  return <Recipe key={"key-" + Date.now()} data={data} />;
};

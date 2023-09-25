/*
  Query the data for the requested recipe page and then call the page with the queried data.
  "/recipe/urlName"
*/

import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Recipe } from "./Recipe";

export const RecipeQuerier = () => {
  const { urlName } = useParams();

  // query the recipe data
  const recipeQuery = useQuery({
    queryKey: [`recipe-${urlName}`],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/recipe/${urlName}`
      );
      return data;
    },
  });

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

  return <Recipe data={data} />;
};

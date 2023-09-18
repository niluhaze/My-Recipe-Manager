import React from "react";
import { useParams } from "react-router-dom";
import { doGetQuery } from "../scripts/query";
import { Edit } from "./Edit";

export const EditExisting = () => {
  const { urlName } = useParams(); // get accessed urlName from /edit/urlName
  const recipeQuery = doGetQuery("edit-recipe", "/recipe/" + urlName);

  // show if loading data
  if (recipeQuery.isLoading) return <h1>Loading...</h1>;
  // show if error occured
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

  // after recipe data has been queried successfully:
  const existingData = recipeQuery.data[0];

  return (
    /* 
      A unique key tells React to rerender Edit,
      otherwise it might show old data when editing different recipes after each other.
    */
    <Edit key={existingData.urlName + Date.now()} existingData={existingData}></Edit>
  );
};

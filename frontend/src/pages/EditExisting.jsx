/* 
  Try to get data from "/recipe/urlName" and call Edit with the data.
*/

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Edit } from "./Edit";

export const EditExisting = () => {
  const { urlName } = useParams(); // get accessed urlName from url
  const recipeQuery = useQuery({
    queryKey: [`recipe-${urlName}`],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/recipe/${urlName}`);
      return data;
    },
  });

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
    <Edit
      existingData={existingData}
    ></Edit>
  );
};

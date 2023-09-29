/* 
  Takes a url query string and makes a request to the backend to retrieve matching recipe data, displaying it in a dynamic grid.
  Used on "/my-recipes" page.
*/

import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RecipeTile from "/src/components/RecipeTile";
import PageButtons from "./PageButtons";

export const RecipeGrid = ({searchParams}) => {
  // get the query string from the url
  // const [searchParams] = useSearchParams();
  const queryString = searchParams;

  // build queryUrl and use it to make GET request to backend
  let queryUrl = "/my-recipes";
  queryUrl += queryString.length > 0 ? "?" + queryString : "";
  // make GET request
  const recipesQuery = useQuery({
    queryKey: ["my-recipes"],
    queryFn: async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + queryUrl
      );
      return data;
    },
  });

  // loading message
  if (recipesQuery.isLoading)
    return <p className="flex justify-center text-neutral-400">Loading recipes...</p>;
  // error message
  if (recipesQuery.isError)
    return (
      <p className="w-full flex break-all justify-center">
        {JSON.stringify(recipesQuery.error)}
      </p>
    );
  // no data found message
  if (recipesQuery.data.meta.recipeQuantity === 0)
    return (
      <p className="flex justify-center text-neutral-400">
        Could not find any recipes matching the applied filters.
      </p>
    );
  
  // default output
  return (
    // map data to recipe tiles and display as grid
    <div className="w-full flex flex-col items-center">
      <PageButtons {...recipesQuery.data.meta} />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-3">
        {recipesQuery.data.recipes.map((tileData) => (
          <RecipeTile key={tileData.urlName} data={tileData} className="w-full" />
        ))}
      </div>
      <PageButtons {...recipesQuery.data.meta} />
    </div>
  );
};

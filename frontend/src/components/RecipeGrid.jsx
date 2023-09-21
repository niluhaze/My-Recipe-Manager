/* 
  Takes a url query string and makes a request to the backend to retrieve matching recipe data, displaying it in a dynamic grid.
  Used on "/my-recipes" page.
*/

import { useSearchParams } from "react-router-dom";
import { doGetQuery } from "../scripts/query";
import RecipeTile from "/src/components/RecipeTile";

export const RecipeGrid = () => {
  // get the query string from the url
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();

  // build queryUrl and use it to make GET request to backend
  let queryUrl = "/my-recipes";
  queryUrl += queryString.length > 0 ? "?" + queryString : "";
  const recipesQuery = doGetQuery("my-recipes", queryUrl);

  // loading message
  if (recipesQuery.isLoading) return <h1>Loading recipes...</h1>;
  // error message
  if (recipesQuery.isError)
    return <pre>{JSON.stringify(recipesQuery.error)}</pre>;
  // no data found message
  if (recipesQuery.data.length === 0)
    return (
      <p className="">
        Could not find any recipes matching the applied filters.
      </p>
    );
  return (
    // map data to recipe tiles and display as grid
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-3">
      {recipesQuery.data.map((tileData) => (
        <RecipeTile key={tileData.urlName} data={tileData} className="w-full" />
      ))}
    </div>
  );
};

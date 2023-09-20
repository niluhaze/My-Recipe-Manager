/* 
  Takes a url query string and makes a request to the backend to retrieve matching recipe data, displaying it in a dynamic grid.
  Used on "/my-recipes" page.
*/

import { doGetQuery } from "../scripts/query";
import RecipeTile from "/src/components/RecipeTile";

export const RecipeGrid = ({ queryString }) => {
  let queryUrl = "/my-recipes";
  queryUrl += queryString.length > 0 ? "?" + queryString : "";
  const recipesQuery = doGetQuery("my-recipes", queryUrl);

  // output loading and error messages when fetching recipe data
  if (recipesQuery.isLoading) return <h1>Loading recipes...</h1>;
  if (recipesQuery.isError)
    return <pre>{JSON.stringify(recipesQuery.error)}</pre>;
  if (recipesQuery.data.length === 0)
    return (
      <div className=" flex justify-items-center">
        <p>Could not find any recipes matching the applied filters.</p>
      </div>
    );
  return (
    // map data to recipe tiles and display as grid
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
      {recipesQuery.data.map((tileData) => (
        <RecipeTile key={tileData.urlName} data={tileData} className="w-full" />
      ))}
    </div>
  );
};

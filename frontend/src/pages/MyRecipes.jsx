/* 
  Displays a grid of recipes, including properties by which to filter and sort recipes.
  Set to display 24 recipes per page.
  When filters applied, sends query to RecipeGrid which performs the GET request and displays the resulting data.
  "/my-recipes"
*/

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FiltersMenu from "/src/components/FiltersMenu";
import { RecipeGrid } from "../components/RecipeGrid";
import { getValue } from "../scripts/getValue";
import { buildQueryString } from "../scripts/buildQueryString";

export function MyRecipes() {
  const navigate = useNavigate(); // prepare useNavigate hook for applying search parameters to url

  // get the query parameters from the url to set the default values of filters
  const [searchParams] = useSearchParams();
  const searchParamsJSON = Object.fromEntries(searchParams); // then use them to create a json object
  searchParamsJSON.tags = searchParams.getAll("tags"); // and include any tags in an array

  /* Variables and functions for the page's dynamic elements */

  //toggle visibility of the filter menu (for small screens)
  const [isFirst, setIsFirst] = useState(true); //for making sure the toggle doesn't trigger on mount
  const [toggleFiltersMenu, setToggleFiltersMenu] = useState(false); //toggle whether the filter menu is shown or hidden
  const [toggleUpdate, setToggleUpdate] = useState(0);

  // handle submission of filters and search
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page reload on submit

    const formData = new FormData(event.target);
    const formJSON = Object.fromEntries(formData.entries()); // put form data into JSON
    formJSON.tags = formData.getAll("tags"); // put all selected tags into array and add it to formJSON

    console.log(formJSON);

    const newQueryString = buildQueryString(formJSON);
    navigate(`/my-recipes?${newQueryString}`);
    setToggleUpdate(toggleUpdate => toggleUpdate+1)
  };

  //run this whenever toggle changes
  useEffect(() => {
    //make sure the code after if block does't get run on mount
    if (isFirst) {
      setIsFirst(false);
      return;
    }
    document.getElementById("filters-menu").classList.toggle("hidden");
    document.getElementById("filters-blur").classList.toggle("hidden");
  }, [toggleFiltersMenu]);

  return (
    <form onSubmit={handleSubmit} className="h-full flex justify-center">
      {/* Filters menu */}
      <div
        id="filters-menu"
        className="z-20 hidden md:block absolute left-0 top-0 bottom-0 md:static h-auto w-[200px] bg-components drop-shadow"
      >
        <FiltersMenu
          toggleFiltersMenu={toggleFiltersMenu}
          setToggleFiltersMenu={setToggleFiltersMenu}
          searchParamsJSON={searchParamsJSON}
        />
      </div>
      {/* When filters menu is active:
          Add a blur behind menu to obscure the recipes behind it
          and to prevent accidental redirects when misclicking a recipe while setting filters */}
      <div
        id="filters-blur"
        className="z-10 hidden md:hidden backdrop-blur-sm absolute top-0 bottom-0 left-0 right-0"
      ></div>
      {/* Wrapper for filter menu button, search bar, and recipe grid */}
      <div className="h-full max-w-[1200px] ">
        {/* Wrapper for filter menu button and search bar */}
        <div className="flex justify-center p-5 gap-3">
          {/* Filter menu toggle button (for small view) */}
          <div className="md:hidden h-10 aspect-square bg-components rounded-full drop-shadow hover:drop-shadow-lg">
            <button
              onClick={(e) => setToggleFiltersMenu(!toggleFiltersMenu)}
              className="h-full w-full p-2"
            >
              {/* Sliders icon */}
              <svg
                className="fill-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M0 416c0 17.7 14.3 32 32 32h54.7c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H233.3c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48H32c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1-64 0zm192-160a32 32 0 1 1 64 0 32 32 0 1 1-64 0zm32-80c-32.8 0-61 19.7-73.3 48H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h246.7c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48H480c17.7 0 32-14.3 32-32s-14.3-32-32-32h-54.7c-12.3-28.3-40.5-48-73.3-48zm-160-48a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48H32C14.3 64 0 78.3 0 96s14.3 32 32 32h86.7c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H265.3z" />
              </svg>
            </button>
          </div>
          {/* Search Bar */}
          <div className="flex py-2 px-4 bg-components rounded-full drop-shadow hover:drop-shadow-lg">
            <input
              type="search"
              id="searchBar"
              name="search"
              placeholder="Search recipes..."
              defaultValue={getValue({data: searchParamsJSON, key: "search"})}
              className="outline-none bg-transparent"
            />
            {/* Submit button */}
            <button type="submit" className="h-6 aspect-square mx-1">
              {/* Magnifying glass icon */}
              <svg
                className="fill-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </button>
          </div>
        </div>
        {/* Recipe Grid */}
        {/* updating key tells react to update component */}
        <RecipeGrid key={toggleUpdate + Date.now()} />
      </div>
    </form>
  );
}

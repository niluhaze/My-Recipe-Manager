/* 
  Content of menu used to select search parameters on page "/my-recipes"
*/

import React from "react";
import allTags from "../assets/tags.json";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../scripts/useWindowDimensions";
import { toggleIfScreenSmall } from "../scripts/toggleIfScreenSmall";

const FiltersMenu = ({
  toggleFiltersMenu,
  setToggleFiltersMenu,
  defaultFormValues,
}) => {
  // prepare useNavigate hook for handleClearButton
  const navigate = useNavigate();

  // get window dimensions
  const windowDimensions = useWindowDimensions();

  // redirect to "/my-recipes" without query string, clearing all form inputs
  const handleClearButton = (event) => {
    event.preventDefault();
    // toggle filter menu on small screens
    toggleIfScreenSmall(
      toggleFiltersMenu,
      setToggleFiltersMenu,
      windowDimensions.width
    );
    navigate("/my-recipes");
  };

  return (
    <>
      {/* Close button */}
      <div className="md:hidden flex justify-end pt-2 px-2">
        <button
          type="button"
          onClick={(e) => setToggleFiltersMenu(!toggleFiltersMenu)}
          className="h-10 aspect-square fill-black"
        >
          {/* X icon */}
          <svg
            className="h-full fill-neutral-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z" />
          </svg>
        </button>
      </div>
      {/* Submit, SortBy and Filters wrapper */}
      <div className=" min-w-[200px] flex flex-col p-2 gap-2">
        {/* Submit button */}
        <button
          type="submit"
          className="p-1 rounded font-semibold text-lg text-components bg-primary hover:bg-primary-400 active:bg-primary-300"
        >
          Apply
        </button>
        {/* Clear button */}
        <button
          onClick={handleClearButton}
          className="p-1 rounded font-semibold text-lg text-primary border border-primary bg-components hover:bg-neutral-200 active:bg-neutral-300"
        >
          Clear Filters
        </button>
        {/* SortBy dropdown */}
        <div>
          <div className="font-semibold text-lg">Sort by</div>
          <select
            id="selectSortBy"
            name="sortBy"
            defaultValue={defaultFormValues.sortBy}
            key={Date.now()}
            // unique key forces react to rerender component, updating the default value
          >
            <option value="-dateAdded">Newest</option>
            <option value="dateAdded">Oldest</option>
            <option value="cookTimeTotal">Fastest (total)</option>
            <option value="-cookTimeTotal">Longest (total)</option>
            <option value="cookTimeActive">Fastest (active)</option>
            <option value="-cookTimeActive">Longest (active)</option>
          </select>
        </div>
        {/* Saved toggle */}
        <label className="flex items-center gap-2 font-semibold text-lg mr-2">
          Saved only
          <input
            className="peer hidden accent-primary"
            type="checkbox"
            name="saved"
            id="saved"
            defaultChecked={defaultFormValues.saved}
            key={Date.now()}
          />
          <div className=" relative translate-y-[2px] flex peer-checked:child:translate-x-5 w-10 h-5 rounded-full bg-neutral-400 hover:bg-neutral-350 peer-checked:bg-primary peer-checked:hover:bg-primary-400 transition-all duration-300 cursor-pointer">
            <div className="relative h-4 aspect-square rounded-full bg-neutral-200 m-[2px] transition-all duration-300"></div>
          </div>
        </label>
        {/* Tags */}
        <div>
          <div className="text-lg font-semibold">Tags</div>
          {/* 
          allTags stores tags like this:
          {
            category1: [tag01, tag02, ...]
            category2: [tag11, tag12, ...]
            ...
          }
          create sections of tags with categoryN as headline...
          */}
          {Object.keys(allTags).map((category) => (
            <div key={"key-category-" + category}>
              <div className="m-1 text-neutral-800">{category}</div>
              <div className="flex flex-col gap-2">
                {/* ...and then create the corresponding tag checkmarks below: */}
                {allTags[category].map((tag) => (
                  <div key={"key-tag-" + tag}>
                    <input
                      className="peer/check hidden"
                      type="checkbox"
                      name="tags"
                      id={"id-" + tag}
                      value={tag}
                      defaultChecked={defaultFormValues.tags[tag]}
                      key={Date.now()}
                    />
                    <label
                      className="px-2 py-[2px] rounded-full bg-neutral-400 hover:bg-neutral-450 active:bg-neutral-500 text-components peer-checked/check:bg-primary peer-checked/check:hover:bg-primary-400 peer-checked/check:active:bg-primary-300"
                      htmlFor={"id-" + tag}
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FiltersMenu;

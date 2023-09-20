/* 
  Content of menu used to select search parameters on page "/my-recipes"
*/

import React from "react";
import allTags from "../assets/tags.json";

const FiltersMenu = ({ toggleFiltersMenu, setToggleFiltersMenu }) => {
  return (
    <>
      {/* Cancel button */}
      <div className="md:hidden flex justify-end mt-2 mx-2">
        <button
          onClick={(e) => setToggleFiltersMenu(!toggleFiltersMenu)}
          className="h-10 aspect-square fill-black"
        >
          {/* X icon */}
          <svg
            className="h-full"
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
          className="p-1 rounded font-semibold text-lg text-components bg-primary hover:bg-primary-light active:bg-primary-light-light"
        >
          Apply
        </button>
        {/* SortBy dropdown */}
        <div>
          <div className="font-semibold text-lg">Sort by</div>
          <select id="selectSortBy" name="sortBy">
            <option value="-dateAdded">Newest</option>
            <option value="dateAdded">Oldest</option>
            <option value="cookTimeTotal">Fastest (total)</option>
            <option value="-cookTimeTotal">Longest (total)</option>
            <option value="cookTimeActive">Fastest (active)</option>
            <option value="-cookTimeActive">Longest (active)</option>
          </select>
        </div>
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
                    />
                    <label
                      className="px-2 py-[2px] rounded-full bg-neutral-400 text-components peer-checked/check:bg-primary"
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

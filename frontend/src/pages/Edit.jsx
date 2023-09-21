/* 
  Edit existing or create new recipe.
  If called by EditExisting: "/edit/urlName" called with existing recipe data which is displayed on page.
  If called by EditNew: "/edit" called without and data, displaying empty inputs.
*/

// specify imports
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import ImageUpload from "/src/components/ImageUpload";
import { doPostQuery, doDeleteQuery } from "/src/scripts/query.jsx";
import { minutesToHoursMinutes } from "../scripts/time";
import { delay } from "../scripts/delay";
import allTags from "/src/assets/tags.json";

export const Edit = ({ existingData = {} }) => {
  // check if urlName is undefined, if so, will create new recipe, else, will edit existing one
  const isEditExisting = existingData.urlName !== undefined;
  let urlName;
  let defaultImage = null;
  //prepare data if available
  if (isEditExisting) {
    console.log("isEditExisting: true");
    urlName = existingData.urlName;
    defaultImage = existingData.image !== "" ? existingData.image : null;
  }

  console.log("title:", existingData.recipeName);

  const [image, setImage] = useState(defaultImage); // stores image from ImageUpload
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // stores whether submit button is disabled or not

  // reference for the form element
  const formRef = React.useRef(null);

  // prepare POST hook
  const url = isEditExisting ? "/edit/" + urlName : "/edit";
  const postRecipe = doPostQuery(url);
  // prepare DELETE hook
  const deleteRecipe = doDeleteQuery(url);

  // convert form data to JSON and send as POST request to backend
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page reload on submit

    setIsButtonDisabled(true); // disable submit button

    const formData = new FormData(event.target); // get data from form
    const formJSON = Object.fromEntries(formData.entries()); // put form data into JSON

    // put all selected tags into array and add it to formJSON
    formJSON.tags = formData.getAll("tags");

    //convert time to minutes and store result behind new key
    const timeToMinutes = (hours, minutes) => {
      return Number(60 * hours) + Number(minutes);
    };
    formJSON.cookTimeTotal = timeToMinutes(
      formJSON.cookTimeTotalHours,
      formJSON.cookTimeTotalMinutes
    );
    formJSON.cookTimeActive = timeToMinutes(
      formJSON.cookTimeActiveHours,
      formJSON.cookTimeActiveMinutes
    );
    // delete old keys
    [
      "cookTimeTotalHours",
      "cookTimeTotalMinutes",
      "cookTimeActiveHours",
      "cookTimeActiveMinutes",
    ].forEach((e) => delete formJSON[e]);

    formJSON.image = image;
    console.log(formJSON);
    postRecipe.mutate(formJSON);
  };

  // delete recipe when delete button clicked
  const handleDeleteClick = (event) => {
    event.preventDefault();

    deleteRecipe.mutate();
  };

  useEffect(() => {
    // listen for form submit event and then run handleSubmit
    try {
      formRef.current.addEventListener("submit", handleSubmit);
    } catch (error) {
      console.log("addEventListner error");
    }
    return () => {
      try {
        formRef.current.removeEventListener("submit", handleSubmit);
      } catch (error) {
        console.log("removeEventListner error");
      }
    };
  });

  // used for setting value prop of the form inputs
  // get a value from existing recipe data if it is defined, else return a default value
  const getValue = (valueKey, defaultValue = null) => {
    if (existingData[valueKey] != undefined) {
      return existingData[valueKey];
    }
    return defaultValue;
  };

  // same as previous function but intended to get active status for tag checkboxes
  // checks if given tag value is
  const getValueTags = (tag, defaultValue = false) => {
    // if not editing existing, return default value
    if (!isEditExisting) return defaultValue;
    // if tag included in existing data return true, else false
    return existingData.tags.includes(tag);
  };

  // if the recipe has been successfully posted:
  if (postRecipe.isSuccess) {
    console.log("Success!!", postRecipe.data.data.recipeName);
    delay(1000);
    return <Navigate to={"/recipe/" + postRecipe.data.data.urlName} replace />;
  }

  // if the recipe has been successfully deleted:
  if (deleteRecipe.isSuccess) {
    console.log("Delete Success!!");
    delay(1000);
    return <Navigate to="/my-recipes" replace />;
  }

  return (
    <form
      ref={formRef}
      className="w-full max-w-3xl md:mx-auto md:m-4 md:rounded-2xl shadow bg-components"
    >
      {/* Image and Title wrapper */}
      <div>
        {/* Image */}
        <ImageUpload image={image} setImage={setImage} />
        {/* Title */}
        <div className="p-3 flex flex-col gap-1 text-lg font-semibold">
          <label htmlFor="recipeName">Title</label>
          <input
            required
            type="text"
            name="recipeName"
            id="recipeName"
            className="w-full text-3xl"
            defaultValue={getValue("recipeName")}
          />
        </div>
      </div>
      {/* Tags */}
      <div className="mx-2">
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
            <div className="flex flex-wrap gap-2">
              {/* ...and then create the corresponding tag checkmarks below: */}
              {allTags[category].map((tag) => (
                <div key={"key-tag-" + tag}>
                  <input
                    className="peer/check hidden"
                    type="checkbox"
                    name="tags"
                    id={"id-" + tag}
                    value={tag}
                    defaultChecked={getValueTags(tag)}
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
      <div className="p-3 flex flex-col gap-2">
        {/* Time, Quantity, Unit and Submit wrapper */}
        <div className="flex flex-col gap-4">
          {/* Time wrapper */}
          <div className="flex gap-2">
            {/* Total Time */}
            <div className="flex flex-col gap-1">
              <label htmlFor="cookTimeTotalMinutes">Total time</label>
              <div className="flex gap-1">
                <input
                  type="number"
                  name="cookTimeTotalHours"
                  id="cookTimeTotalHours"
                  placeholder="h"
                  min={0}
                  max={990}
                  className="w-12 no-arrows"
                  defaultValue={
                    minutesToHoursMinutes(getValue("cookTimeTotal")).hours
                  }
                />
                <input
                  type="number"
                  name="cookTimeTotalMinutes"
                  id="cookTimeTotalMinutes"
                  placeholder="min"
                  min={0}
                  max={240}
                  className="w-12 no-arrows"
                  defaultValue={
                    minutesToHoursMinutes(getValue("cookTimeTotal")).minutes
                  }
                />
              </div>
            </div>
            {/* Active Time */}
            <div className="flex flex-col gap-1">
              <label htmlFor="cookTimeActiveMinutes">Active time</label>
              <div className="flex gap-1">
                <input
                  type="number"
                  name="cookTimeActiveHours"
                  id="cookTimeActiveHours"
                  placeholder="h"
                  min={0}
                  max={990}
                  className="w-12 no-arrows"
                  defaultValue={
                    minutesToHoursMinutes(getValue("cookTimeActive")).hours
                  }
                />
                <input
                  required
                  type="number"
                  name="cookTimeActiveMinutes"
                  id="cookTimeActiveMinutes"
                  placeholder="min"
                  min={0}
                  max={240}
                  className="w-12 no-arrows"
                  defaultValue={
                    minutesToHoursMinutes(getValue("cookTimeActive")).minutes
                  }
                />
              </div>
            </div>
          </div>
          {/* Quantity and Unit wrapper */}
          <div className="flex gap-2">
            <div className="flex flex-col gap-1">
              {/* Quantity */}
              <label htmlFor="quantity">Quantity</label>
              <input
                required
                type="number"
                name="quantity"
                id="quantity"
                placeholder="4"
                min={0}
                max={9999}
                className="w-16"
                defaultValue={getValue("quantity")}
              />
            </div>
            <div className="flex flex-col gap-1">
              {/* Unit */}
              <label htmlFor="quantityUnit">Unit</label>
              <input
                required
                type="text"
                name="quantityUnit"
                id="quantityUnit"
                placeholder="Portions"
                defaultValue={getValue("quantitiy", "Portions")}
                className="w-32"
              />
            </div>
          </div>
          {/* Submit and Delete Buttons */}
          <div className="flex gap-2">
            <input
              type="submit"
              disabled={isButtonDisabled}
              value={isEditExisting ? "Save Edits" : "Save new Recipe"}
              className="w-36 h-8 p-1 rounded-lg text-components bg-primary hover:bg-primary-light active:bg-primary-light-light disabled:bg-neutral-400"
            />
            {isEditExisting ? ( // show delete button only if editing exisiting recipe
              <button
                onClick={handleDeleteClick}
                disabled={isButtonDisabled}
                className="w-36 h-8 p-1 rounded-lg text-primary bg-components border border-primary hover:border-primary-light hover:text-primary-light active:border-primary-light-light active:text-primary-light-light"
              >
                Delete Recipe
              </button>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {/* Ingredients */}
          <label htmlFor="body" className="text-lg">
            Ingredients
          </label>
          <TextareaAutosize
            name="ingredients"
            id="ingredients"
            rows="128"
            defaultValue={getValue("ingredients")}
            minRows={8}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          {/* Recipe Instructions / Body */}
          <label htmlFor="body" className="text-lg">
            Instructions
          </label>
          <TextareaAutosize
            name="body"
            id="body"
            className="w-full"
            rows="128"
            defaultValue={getValue("body")}
            minRows={8}
          />
        </div>
      </div>
    </form>
  );
};

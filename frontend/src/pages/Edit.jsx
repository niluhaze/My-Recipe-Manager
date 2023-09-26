/* 
  Edit existing or create new recipe.
  If called by EditExisting: "/edit/urlName" called with existing recipe data which is displayed on page.
  If called by EditNew: "/edit" called without and data, displaying empty inputs.
*/

// specify imports
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import ImageUpload from "/src/components/ImageUpload";
import { getValue, getValueTags } from "../scripts/getValue";
import { getValueHoursMinutes } from "../scripts/getValueHoursMinutes";
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

  // get json of default values for active/total time entries
  const cookTime = getValueHoursMinutes(existingData, isEditExisting);

  const [image, setImage] = useState(defaultImage); // stores image from ImageUpload
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // stores whether submit button is disabled or not

  // prepate useNavigate hook
  const navigate = useNavigate();

  const queryClient = useQueryClient(); // used to invalidate queries after mutation
  // prepare POST mutation
  const urlPath = isEditExisting ? "/edit/" + urlName : "/edit";
  const postRecipe = useMutation({
    mutationFn: (data) => {
      return axios.post(import.meta.env.VITE_APP_BACKEND_URL + urlPath, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-recipes", `recipe-${urlName}`]);
      console.log("Post success!!");
    },
  });

  // prepare DELETE mutation
  const deleteRecipe = useMutation({
    mutationFn: () => {
      return axios.delete(import.meta.env.VITE_APP_BACKEND_URL + urlPath);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-recipes", `recipe-${urlName}`]);
      console.log("Delete success!!");
      navigate("/my-recipes");
    },
  });

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

  // if recipe was successfully updated, navigate to its page
  if (postRecipe.isSuccess) {
    return <Navigate to={"/recipe/" + postRecipe.data.data.urlName} />;
  }

  return (
    <form
      className="w-full max-w-3xl md:mx-auto md:m-4 md:rounded-2xl shadow bg-components"
    >
      {/* Image and Title wrapper */}
      <div>
        {/* Image */}
        <ImageUpload image={image} setImage={setImage} />
        {/* Title */}
        <div className="p-3 flex flex-col gap-1 text-lg font-semibold">
          <label htmlFor="recipeName">Title</label>
          <TextareaAutosize
            required
            type="text"
            name="recipeName"
            id="recipeName"
            className="w-full text-3xl px-1 rounded-lg"
            defaultValue={getValue({ data: existingData, key: "recipeName" })}
            minRows={1}
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
                    defaultChecked={getValueTags({
                      tagArray: existingData.tags,
                      tag: tag,
                    })}
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
            {/* Active Time */}
            <div className="flex flex-col gap-1">
              <label htmlFor="cookTimeActiveMinutes">Active time</label>
              <div className="flex gap-1 rounded-lg bg-white">
                <input
                  type="number"
                  name="cookTimeActiveHours"
                  id="cookTimeActiveHours"
                  placeholder="h"
                  min={0}
                  max={998}
                  className="w-10 no-arrows rounded-l-lg pl-1"
                  defaultValue={cookTime.activeHours}
                />
                <p className="text-neutral-400 ">:</p>
                <input
                  required
                  type="number"
                  name="cookTimeActiveMinutes"
                  id="cookTimeActiveMinutes"
                  placeholder="min"
                  min={0}
                  max={60}
                  className="w-10 no-arrows rounded-r-lg"
                  defaultValue={cookTime.activeMinutes}
                />
              </div>
            </div>
            {/* Total Time */}
            <div className="flex flex-col gap-1">
              <label htmlFor="cookTimeTotalMinutes">Total time</label>
              <div className="flex gap-1 rounded-lg bg-white">
                <input
                  type="number"
                  name="cookTimeTotalHours"
                  id="cookTimeTotalHours"
                  placeholder="h"
                  min={0}
                  max={998}
                  className="w-10 no-arrows rounded-l-lg pl-1"
                  defaultValue={cookTime.totalHours}
                />
                <p className="text-neutral-400 ">:</p>
                <input
                  type="number"
                  name="cookTimeTotalMinutes"
                  id="cookTimeTotalMinutes"
                  placeholder="min"
                  min={0}
                  max={60}
                  className="w-10 no-arrows rounded-r-lg"
                  defaultValue={cookTime.totalMinutes}
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
                className="w-16 px-1 rounded-lg"
                defaultValue={getValue({ data: existingData, key: "quantity" })}
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
                defaultValue={getValue({
                  data: existingData,
                  key: "quantityUnit",
                  defaultValue: "Portions",
                })}
                className="w-32 px-1 rounded-lg"
              />
            </div>
          </div>
          {/* Submit and Delete Buttons */}
          <div className="flex gap-2">
            <input
              type="submit"
              onClick={handleSubmit}
              disabled={isButtonDisabled}
              value={isEditExisting ? "Save Edits" : "Save new Recipe"}
              className="w-36 h-8 p-1 rounded-lg text-components bg-primary hover:bg-primary-light active:bg-primary-light-light disabled:bg-neutral-400"
            />
            {isEditExisting ? ( // show delete button only if editing exisiting recipe
              <button
                onClick={handleDeleteClick}
                disabled={isButtonDisabled}
                className="w-36 h-8 p-1 rounded-lg text-primary bg-components border border-primary hover:border-red-500 hover:text-red-500 active:border-red-600 active:text-red-600"
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
            defaultValue={getValue({ data: existingData, key: "ingredients" })}
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
            defaultValue={getValue({ data: existingData, key: "body" })}
            minRows={8}
          />
        </div>
      </div>
    </form>
  );
};

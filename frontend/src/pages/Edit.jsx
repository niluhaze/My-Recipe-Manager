// specify imports
import React, { useEffect, useState } from "react";
import ImageUpload from "/src/components/ImageUpload";
import { doPostQuery } from "/src/scripts/query.jsx";
import tags from "/src/assets/tags.json";
import { Navigate } from "react-router-dom";

export function Edit() {

  const [image, setImage] = useState(null); // will store image from ImageUpload

  const formRef = React.useRef(null); // reference for the form element

  const postRecipe = doPostQuery("/edit");
  // convert form data to JSON and send as POST to backend
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page reload on submit

    const formData = new FormData(event.target); // get data from form
    const formJSON = Object.fromEntries(formData.entries()); // put form data into JSON

    // for future use: put all selected tags into array and add it to formJSON
    // formJSON.tags = data.getAll('tags');

    console.log(formJSON)

    //convert time to minutes, store result behind new key and delete old keys
    const timeToMinutes = (hours, minutes) => {return Number(60 * hours + minutes)}
    formJSON.cookTimeTotal = timeToMinutes(formJSON.cookTimeTotalHours, formJSON.cookTimeTotalMinutes);
    formJSON.cookTimeActive = timeToMinutes(formJSON.cookTimeActiveHours, formJSON.cookTimeActiveMinutes);
    ["cookTimeTotalHours", "cookTimeTotalMinutes", "cookTimeActiveHours", "cookTimeActiveMinutes"]
    .forEach(e => delete formJSON[e]);

    formJSON.image = image;
    console.log(formJSON)
    postRecipe.mutate(formJSON);
  }

  useEffect(() => {
    if (formRef.current != null) {
      formRef.current.addEventListener("submit", handleSubmit);
    }
    return () => {
      if (formRef.current != null) {
        formRef.current.removeEventListener("submit", handleSubmit);
      }
    }
  });

  if(postRecipe.isSuccess) {
    console.log("Success!!", postRecipe.data.data)
    const delay = ms => new Promise(res => setTimeout(res, ms));
    delay(1000)
    return <Navigate to={"/recipe/" + postRecipe.data.data.urlName}/>
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
        <div className="p-3 flex flex-col gap-1">
          <label htmlFor="recipeName">Title</label>
          <input
            required
            type="text"
            name="recipeName"
            id="recipeName"
            className="w-full text-3xl"
          />
        </div>
      </div>
      <div className="p-3 flex flex-col gap-2">
        {/* Time, Quantity, Unit and Submit wrapper */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
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
                />
                <input
                  type="number"
                  name="cookTimeTotalMinutes"
                  id="cookTimeTotalMinutes"
                  placeholder="min"
                  min={0}
                  max={240}
                  className="w-12 no-arrows"
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
                defaultValue="Portions"
                placeholder="Portions"
              />
            </div>
          </div>
          {/* Submit Button */}
          <input
            type="submit"
            value="Save new Recipe"
            className="w-36 h-8 p-1 rounded-lg text-components bg-primary hover:bg-primary-light active:bg-primary-light-light"
          />
        </div>
        <div className="flex flex-col gap-1">
          {/* Recipe Body */}
          <label htmlFor="body">Ingredients & Instructions</label>
          <textarea name="body" id="body" className="w-full" rows="128" />
        </div>
      </div>
    </form>
  );
}

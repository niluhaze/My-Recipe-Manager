/* 
  Called by RecipeQuerier.
  Takes recipe data and displays it.
*/

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SaveButton } from "../components/SaveButton";
import { minutesToTime } from "../scripts/time";
import { multiplyNumbersInStringBy } from "../scripts/multiplyNumbersInStringBy";

export function Recipe({ data }) {
  const [ingredients, setIngredients] = useState(data.ingredients);

  /*
    Update the ingredients state when data.ingredients changes.
    Otherwise the state stays the same when data.ingredients changes after an edit.
  */
  useEffect(() => {
    setIngredients(data.ingredients);
  }, [data.ingredients]);

  const handleQuantityChange = (event) => {
    event.preventDefault(); // prevent page reload on submit

    const newQuantity = event.target.form[0].value; // get new quantity from form

    // multiply all numbers in instructions to match new quantity and apply new ingredient list to page
    const newIngredients = multiplyNumbersInStringBy(
      data.ingredients,
      newQuantity / data.quantity
    );
    setIngredients(newIngredients);
  };

  let date = data.dateAdded; // Date stored in format yyyy-mm-ddThh:mm:ss.msZ
  date = date.slice(0, date.lastIndexOf("T")); // remove everything after "T"
  date = date.replaceAll("-", " / "); // replace - with /

  return (
    <>
      <div className="max-w-3xl md:mx-auto md:m-4 md:rounded-2xl pb-2 shadow bg-components">
        {/* Save Button */}
        <div className="absolute right-0 m-3">
          <SaveButton
            urlName={data.urlName}
            isSavedDefault={data.saved}
            key={data.saved}
          />
        </div>
        {/* Image */}
        <div className="w-full aspect-[4/3] flex flex-col justify-center items-center border-b">
          {data.image != undefined && data.image != "" ? (
            <img
              className="object-cover w-full h-full md:rounded-t-2xl"
              src={data.image}
              alt="No image found"
            />
          ) : (
            <p className="text-neutral-500">No image found</p>
          )}
        </div>
        {/* Content wrapper */}
        <div className="break-words flex flex-col gap-2 m-2">
          {/* Title and Edit button wrapper */}
          <div className="flex justify-between">
            {/* Title */}
            <p className="break-words font-semibold text-4xl">
              {data.recipeName}
            </p>
            {/* Edit button */}
            {/* replace prop prevents page from being stored in history */}
            <Link to={"/edit/" + data.urlName}>
              {/* Edit icon */}
              <svg
                className="h-6 fill-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0l-30.1 30 97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2l-18.7-18.6zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5l167.3-167.4-98-98-167.3 167.4zM96 64c-53 0-96 43-96 96v256c0 53 43 96 96 96h256c53 0 96-43 96-96v-96c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
              </svg>
            </Link>
          </div>
          {/* Info Wrapper */}
          <div className="border-t border-b py-1 gap-1 justify-between flex text-neutral-500 border-neutral-300">
            {/* Time */}
            <div className="flex gap-1 items-center">
              {/* Clock Icon */}
              <svg
                className="h-4 fill-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M464 256a208 208 0 1 1-416 0 208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0 256 256 0 1 0-512 0zm232-136v136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
              </svg>
              <p className="relative bottom-px">
                Active {minutesToTime(data.cookTimeActive)} / Total{" "}
                {minutesToTime(data.cookTimeTotal)}
              </p>
            </div>
            {/* Date */}
            <p className="relative bottom-px">{date}</p>
          </div>
          {/* Tags */}
          {data.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1 border-b border-neutral-300 pb-2">
              {data.tags.map((tagName) => (
                <p
                  className="px-2 rounded-full bg-primary text-components"
                  key={tagName}
                >
                  {tagName}
                </p>
              ))}
            </div>
          ) : null}

          {/* Quantity */}
          <form className="flex items-center h-8 w-fit gap-2 rounded-lg bg-white">
            <input
              type="number"
              defaultValue={data.quantity}
              key={data.quantity}
              id="quantity"
              name="quantity"
              min={0}
              max={999}
              className="w-12 pl-2 bg-transparent outline-none"
            />
            <label htmlFor="quantity">{data.quantityUnit}</label>
            <button
              type="submit"
              className="h-8 px-2 rounded-r-lg text-components bg-primary hover:bg-primary-light active:bg-primary-light-light"
              onClick={handleQuantityChange}
            >
              Apply
            </button>
          </form>
          {/* Ingredients */}
          <h2 className="text-lg font-semibold">Ingredients</h2>
          <p className="whitespace-pre-line" key={data.ingredients}>
            {ingredients}
          </p>
          {/* Instructions / Body */}
          <h2 className="text-lg font-semibold">Instructions</h2>
          <p className="whitespace-pre-line">{data.body}</p>
        </div>
      </div>
    </>
  );
}

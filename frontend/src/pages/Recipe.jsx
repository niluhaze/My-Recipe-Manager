import { Navigate, useParams, Link } from "react-router-dom";
import { doGetQuery } from "../scripts/query";
import { minutesToTime } from "../scripts/time";

export function Recipe() {
  const { urlName } = useParams();

  // query the recipe data
  const recipeQuery = doGetQuery("recipe", "/recipe/" + urlName);

  if (recipeQuery.isLoading) return <h1>Loading...</h1>;
  if (recipeQuery.isError) {
    try {
      console.log(recipeQuery.error.response.status);
      if (recipeQuery.error.response.status == 404)
        return <Navigate to="/not-found" />;
    } catch (error) {
      console.log(error);
    }
    return <pre>{JSON.stringify(recipeQuery.error)}</pre>;
  }

  const data = recipeQuery.data[0];

  let date = data.dateAdded; // Date stored in format yyyy-mm-ddThh:mm:ss.msZ
  date = date.slice(0, date.lastIndexOf("T")); // remove everything after "T"
  date = date.replaceAll("-", " / "); // replace - with /

  return (
    <>
      <div className="w-full max-w-3xl md:mx-auto md:m-4 md:rounded-2xl shadow bg-components">
        {/* Image */}
        <div className="w-full aspect-[4/3] flex flex-col justify-center items-center">
          <img
            className="object-cover w-full h-full md:rounded-t-2xl"
            src={data.image}
            alt="No image found"
          />
        </div>
        {/* Content wrapper */}
        <div className="break-words flex flex-col gap-2 m-2">
          {/* Title and Edit button wrapper */}
          <div className="flex justify-between">
            {/* Title */}
            <p className="break-words font-semibold text-4xl">{data.recipeName}</p>
            {/* Edit button */}
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
              Active {minutesToTime(data.cookTimeActive)} / Total{" "}
              {minutesToTime(data.cookTimeTotal)}
            </div>
            {/* Date */}
            <div>{date}</div>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {data.tags.map((tagName) => (
              <p
                className="px-2 rounded-full bg-primary text-components"
                key={tagName}
              >
                {tagName}
              </p>
            ))}
          </div>
          {/* Quantity */}
          <form className="flex gap-2">
            <input
              type="number"
              defaultValue={data.quantity}
              id="quantity"
              name="quantity"
              min={0}
              max={999}
              className="w-12"
            />
            <label htmlFor="quantity">{data.quantityUnit}</label>
          </form>
          {/* Ingredients */}
          <p className="text-lg font-semibold">Ingredients</p>
          <p className="whitespace-pre-line">{data.instructions}</p>
          {/* Instructions / Body */}
          <p className="text-lg font-semibold">Instructions</p>
          <p className="whitespace-pre-line">{data.body}</p>
        </div>
      </div>
    </>
  );
}

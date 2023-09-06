import React from "react"
import { Link } from "react-router-dom"

const URL_NAME = "falafel"

const RecipeTile = () => {
  return (
    <Link to={"/recipe/" + URL_NAME}>
      <div className="max-w-full min-w-0 rounded-lg bg-components drop-shadow hover:drop-shadow-lg" useid="falafel">
        {/* Image section */}
        <div className="w-full aspect-[4/3]">
          <img className="rounded-t-lg object-cover w-full h-full" src="/src/assets/falafel.jpg" alt="Falafel" />
        </div>
        {/* Information section */}
        <div className="min-w-0 truncate p-2">
          {/* Title */}
          <div className="min-w-0 truncate font-semibold text-lg">
            Falafel text text text text text text text text text text text text text text text
          </div>
          {/* Cook time */}
          <div className="flex content-center">
            {/* Clock icon */}
            <svg className="w-4 fill-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M464 256a208 208 0 1 1-416 0 208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0 256 256 0 1 0-512 0zm232-136v136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
            </svg>
            {/* Time */}
            <div className=" ml-1 text-neutral-500">30min</div>
          </div>
        </div>
      </div>
    </Link>
    
  )
}

export default RecipeTile
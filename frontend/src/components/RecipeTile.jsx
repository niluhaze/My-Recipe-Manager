import React from "react"
import { Link } from "react-router-dom"
import "./recipeTile.css"

const URL_NAME = "falafel"

const RecipeTile = () => {
  return (
    <Link to={"/recipe/" + URL_NAME}>
      <div className="w-[300px] rounded-md bg-components" useid="falafel">
        <div className="w-full aspect-[4/3]">
          <img className="rounded-t-md object-cover w-full h-full" src="/src/assets/falafel.jpg" alt="Falafel" />
        </div>
        <div>
          <div className="font-semibold truncate text-lg">
            Falafel blablllasdsdsdsdsdsdsdlsdsdsdsdsdsdsdlallbla
          </div>
          <div className="">30min</div>
        </div>
      </div>
    </Link>
    
  )
}

export default RecipeTile
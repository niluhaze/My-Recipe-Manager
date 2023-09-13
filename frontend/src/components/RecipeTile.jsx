import React from "react"
import { Link } from "react-router-dom"

// time is stored in minutes, this converts it to hours and minutes
const minutesToTime = (minutes) => {
  //add leading zeroes to a number to make it 2 digits or more
  const addLeadingZeroes = (number) => {
    number = String(number)
    //if number's length is less than 2 add leading zeros to make it 2 digits, else leave as is
    return (number.length < 2) ? ('00'+number).slice(-2) : number
  }
  const newMinutes = minutes % 60;
  const newHours = minutes - newMinutes;
  return `${addLeadingZeroes(newHours)}:${addLeadingZeroes(newMinutes)}`;
}

const RecipeTile = (query) => {

  const data = query.data;

  console.log(data)
  console.log(data.recipeName)

  return (
    <Link to={"/recipe/" + data.urlName} className="w-full">
      <div className="w-full rounded-lg bg-components drop-shadow hover:drop-shadow-lg" useid="falafel">
        {/* Image section */}
        <div className="w-full aspect-[4/3]">
          <img className="rounded-t-lg object-cover w-full h-full bg-not-found text-neutral-400 flex justify-center items-center" src={data.image} alt="No image found" />
        </div>
        {/* Information section */}
        <div className="min-w-0 truncate p-2">
          {/* Title */}
          <div className="min-w-0 truncate font-semibold text-lg">
            {data.recipeName}
          </div>
          {/* Cook time */}
          <div className="flex content-center">
            {/* Clock icon */}
            <svg className="w-4 fill-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M464 256a208 208 0 1 1-416 0 208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0 256 256 0 1 0-512 0zm232-136v136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
            </svg>
            {/* Time */}
            <div className=" ml-1 text-neutral-500">
              {`${minutesToTime(data.cookTimeActive)}/${minutesToTime(data.cookTimeTotal)}`}
            </div>
          </div>
        </div>
      </div>
    </Link>
    
  )
}

export default RecipeTile
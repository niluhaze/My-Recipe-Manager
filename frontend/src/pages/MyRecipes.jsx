import { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@tanstack/react-query"
import { doGetQuery } from "../scripts/query"

import RecipeTile from "/src/components/RecipeTile"

export function MyRecipes(){

  const test = useParams()
  console.log(test)

  const recipesQuery = doGetQuery("my-recipes", "/my-recipes?sortBy=cookTimeTotal&sortDir=-1")

  if(recipesQuery.isLoading) return <h1>Loading...</h1>
  if(recipesQuery.isError) return <pre>{JSON.stringify(recipesQuery.error)}</pre>

  return (
    <>
      <div className="max-w-full flex justify-center">
        <div className="max-w-[1400px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 m-3">
            <RecipeTile/>
            <RecipeTile/>
            <RecipeTile/>
            <RecipeTile/>
            <RecipeTile/>
            <RecipeTile/>
            <RecipeTile/>
            <RecipeTile/>
            <RecipeTile/>
            <RecipeTile/>
            <RecipeTile/>
            <RecipeTile/>
          </div>
        </div>
      </div>
      
      <form className="query-form">

      </form>
      <h1>
        {recipesQuery.data.map(recipe => (
          <div key={recipe.urlName}>{recipe.recipeName}, {recipe.cookTimeTotal} min</div>
        ))}
      </h1>
    </>
  )
}
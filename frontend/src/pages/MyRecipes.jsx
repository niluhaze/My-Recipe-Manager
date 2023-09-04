import { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@tanstack/react-query"
import { doGetQuery } from "../scripts/query"


export function MyRecipes(){

  const test = useParams()
  console.log(test)

  const recipesQuery = doGetQuery("my-recipes", "/my-recipes?sortBy=cookTimeTotal&sortDir=-1")

  if(recipesQuery.isLoading) return <h1>Loading...</h1>
  if(recipesQuery.isError) return <pre>{JSON.stringify(recipesQuery.error)}</pre>

  return (
    <>
      <h1>MyRecipes</h1>
      <h2>{}</h2>

      <form className="query-form">

      </form>

      <h1>{recipesQuery.data.map(recipe => (
        <div key={recipe.urlName}>{recipe.recipeName}, {recipe.cookTimeTotal} min</div>
      ))}</h1>
    </>
  )
}
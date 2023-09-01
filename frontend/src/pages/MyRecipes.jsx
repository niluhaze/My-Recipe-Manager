import { useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"

const RECIPES = [
  {_id: 1, recipeName: "Falafel"},
  {_id: 2, recipeName: "Pancakes"}
]

export function MyRecipes(){

  const recipesQuery =  useQuery({
    queryKey: ["recipes"],
    queryFn: () => wait(1000).then(() => [...RECIPES])
  })

  if(recipesQuery.isLoading) return <h1>Loading...</h1>
  if(recipesQuery.isError) return <pre>{JSON.stringify(recipesQuery.error)}</pre>

  return (
    <>
      <h1>MyRecipes</h1>
      <h1>{recipesQuery.data.map(recipe => (
        <div key={recipe._id}>{recipe.recipeName}</div>
      ))}</h1>
      <form className="query-form">
        
      </form>
    </>
  )
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}
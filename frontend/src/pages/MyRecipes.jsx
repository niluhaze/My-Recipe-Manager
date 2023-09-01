import { useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"

export function MyRecipes(){

  const recipesQuery =  useQuery({
    queryKey: ["my-recipes"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/my-recipes")
      return data
    }
  })

  if(recipesQuery.isLoading) return <h1>Loading...</h1>
  if(recipesQuery.isError) return <pre>{JSON.stringify(recipesQuery.error)}</pre>

  return (
    <>
      <h1>MyRecipes</h1>

      <form className="query-form">

      </form>

      <h1>{recipesQuery.data.map(recipe => (
        <div key={recipe.urlName}>{recipe.recipeName}, {recipe.cookTimeTotal} min</div>
      ))}</h1>
    </>
  )
}
import { useParams } from "react-router-dom"
import { doGetQuery } from "../scripts/query"

export function Recipe(){

  const { urlName } = useParams()

  const recipeQuery = doGetQuery("recipe", ("/recipe/" + urlName))

  if (recipeQuery.isLoading) return <h1>Loading...</h1>
  if (recipeQuery.isError) return <pre>{JSON.stringify(recipeQuery.error)}</pre>

  return (
    <>
      <h1>Recipe</h1>
      <h2>{JSON.stringify(recipeQuery.data)}</h2>
    </>
  )
}
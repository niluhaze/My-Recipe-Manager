import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function NotFound(){

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/my-recipes")
    }, 2000)
  }, [])

  return (
    <>
      <h1 className="text-3xl p-3">404 - Page not found.</h1>
    </>
  )
}

//specify imports
import React from 'react'
import { Route, Routes } from "react-router-dom"
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Home } from "./pages/Home"
import { Edit } from "./pages/Edit"
import { MyRecipes } from "./pages/MyRecipes"
import { Recipe } from "./pages/Recipe"
import { NotFound } from "./pages/NotFound"


function App() {
  return (
    <>
      <h1>Header</h1>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/edit" element={<Edit />}/>
        <Route path="/edit/:urlName" element={<Edit />}/>
        <Route path="/my-recipes" element={<MyRecipes />}/>
        <Route path="/recipe/:urlName" element={<Recipe />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  )
}

export default App

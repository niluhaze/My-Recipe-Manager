//specify imports
import React, { Component } from 'react'
import { Link, Route, Routes } from "react-router-dom"
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

//import all pages
import { Home } from "./pages/Home"
import { MyRecipes } from "./pages/MyRecipes"
import { Recipe } from "./pages/Recipe"
import { Edit } from "./pages/Edit"
import { NotFound } from "./pages/NotFound"

//create the main App structure
function App() {

  return (
    <>
      {/* Page Header */}
      <nav className='header'>
        <ul>
          <li><Link to="/my-recipes">Recipes</Link></li>
          <li><Link to="/edit">New Recipe</Link></li>
        </ul>
      </nav>
      {/* Assign the pages to routes */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/my-recipes" element={<MyRecipes />}/>
        <Route path="/recipe/:urlName" element={<Recipe />}/>
        <Route path="/edit">
          <Route index element={<Edit />}/>  {/* The index propery routes to plain "/edit" */}
          <Route path="/edit/:urlName" element={<Edit />}/>
        </Route>
        <Route path="*" element={<NotFound />}/>  {/* Assigns NotFound to any unspecified urls */}
      </Routes>
    </>
  )
}

export default App
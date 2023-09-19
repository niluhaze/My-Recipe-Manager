//specify imports
import React, { Component } from 'react'
import { Route, Routes } from "react-router-dom"
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

//import components
import Navbar from './components/Navbar'

//import all pages
import { Home } from "./pages/Home"
import { MyRecipes } from "./pages/MyRecipes"
import { RecipeQuerier } from "./pages/RecipeQuerier"
import { EditNew } from './pages/EditNew'
import { EditExisting } from "./pages/EditExisting"

import { NotFound } from "./pages/NotFound"

//create the main App structure
function App() {

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* Page Navbar */}
      <Navbar />
      {/* Assign the pages to routes */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/my-recipes" element={<MyRecipes />}/>
        <Route path="/recipe/:urlName" element={<RecipeQuerier />}/>
        <Route path="/edit">
          <Route index element={<EditNew />}/>  {/* The index propery routes to plain "/edit" */}
          <Route path="/edit/:urlName" element={<EditExisting />}/>
        </Route>
        <Route path="*" element={<NotFound />}/>  {/* Assigns NotFound to any unspecified urls */}
      </Routes>
    </div>
  )
}

export default App
import React from "react"
import { Link } from "react-router-dom"
import "./navbar.css"
 
const Navbar = () => {
  return (
    <nav className="navbar text-background">
      <div className="navbar-logo-container">
        <img className="navbar-logo" src="/src/assets/cook_book_header_icon.svg" alt="icon" />
      </div>
      <div className="navbar-link-container">
        <div className="navbar-link"><Link to="/my-recipes">Recipes</Link></div>
        <div className="navbar-link"><Link to="/edit">New Recipe</Link></div>
      </div>
    </nav>
  )
}

export default Navbar
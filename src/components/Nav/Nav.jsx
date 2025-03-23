import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Nav.css'

function Nav() {
  const { user, logout } = useAuth() // This will work only if wrapped by AuthProvider Pulls the current authenticated user and logout function from the AuthContext using the useAuth hook.
  const navigate = useNavigate()   //Initializes the navigate function so you can redirect users (e.g., after logout).

  const handleLogout = () => {
    logout()        //Clears user session/token from AuthContext.
    navigate('/login')     //After logging out, redirect the user to the login page.
  }

  return (
    <nav className="Navbar">
      <Link to="/" className="nav-logo">🎵 Music App</Link>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/song">Add Song</Link>
            <Link to="/music">Search</Link>
            <Link to="/album-search">Albums</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav


//Renders a <nav> HTML element styled with the Navbar class.
//Logo that links to the homepage (/). Styled with nav-logo.
//Wraps all the nav links in a div with nav-links class.
//Checks if a user is logged in (truthy). - line 19
//Displays full nav menu for authenticated users.
//Clicking “Logout” calls handleLogout, logging the user out and redirecting.

//else line 28
//If no user is logged in, show only links to Register and Login pages.
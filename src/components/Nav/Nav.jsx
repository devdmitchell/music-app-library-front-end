import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Nav.css'

function Nav() {
  const navigate = useNavigate()
  const isAuthenticated = !!localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">🎵 Music App</Link>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/song">Add Song</Link>
            <Link to="/music">Search</Link>
            <Link to="/album">Albums</Link>
            <button onClick={handleLogout} className="nav-button">Logout</button>
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
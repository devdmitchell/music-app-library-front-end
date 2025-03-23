import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Nav.css'

function Nav() {
  const { user, logout } = useAuth() // This will work only if wrapped by AuthProvider
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
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
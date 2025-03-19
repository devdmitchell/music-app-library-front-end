import { NavLink, Link } from 'react-router-dom'
import './Nav.css'

function Nav({ user, handleUserLogout }) {
  return (
    <nav className='Navbar'>
      <div className="h1-logo">
        <h1>
          <Link to="/">Home</Link>
        </h1>
      </div>
      <div className="right-side-nav">
        <ul>
          {user ? (
            <li>
              <NavLink to="/profile">{user.email}</NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          )}

          {user ? (
            <li>
              <NavLink to="/" onClick={handleUserLogout}>Log Out</NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/login">Sign In</NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Nav
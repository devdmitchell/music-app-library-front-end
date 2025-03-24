import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' })   //formData: Holds the values typed into the username and password fields. setFormData: Updates this state when a user types.
  const [error, setError] = useState('')  //error: Stores any error message to be shown (like invalid credentials). setError: Updates the error message.
  const navigate = useNavigate()  //Initializes the navigate function from react-router-dom to programmatically redirect users ( to /dashboard after login).
  const { login } = useAuth()  //Pulls the login function from my Auth context. This function will talk to the backend and handle authentication.

  const handleChange = (e) => {   //Updates the formData as the user types.
    setFormData({ ...formData, [e.target.name]: e.target.value })    //Uses e.target.name to dynamically update either username or password.
  }

  const handleSubmit = async (e) => {   //Runs when the login form is submitted.
    e.preventDefault()    //Prevents the default form submission behavior (which would reload the page).
    setError('')    //Clears any existing error messages.
    const success = await login(formData)   //Calls your context’s login() method with the username and password entered by the user.
    if (success) {
      navigate('/dashboard')  // If the login succeeds, navigate the user to the /dashboard page.
    } else {
      setError('Invalid username or password')       //If login fails, show a helpful error message.
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  )
}

export default Login


//A controlled input for the username. Updates formData.username when typed into.
//Controlled input for password. Bound to formData.password.
//Conditionally renders an error message if one exists.
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Register.css'

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' })   //Initializes local state to keep track of form input values for username and password.
  const { register } = useAuth()     //Destructures the register method from the auth context to handle registration logic.
  const navigate = useNavigate()    //Stores the navigate function for redirecting the user.

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }  //Updates formData when the user types in the form fields. e.target.name is "username" or "password" The rest operator ...prev preserves the previous values.


  const handleSubmit = async (e) => {
    e.preventDefault()    //Prevents the default form behavior (which would reload the page).
    const success = await register(formData)     //Calls the register function from context and awaits the result (true/false).
    if (success) {
      navigate('/login')         //If registration was successful, redirect the user to the login page.
    }
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register


//Wraps everything in a styled container and renders a form with a submit handler.
//Input field for the username, tied to state.
//Input field for the password, also tied to state.
//Submit button that triggers handleSubmit.
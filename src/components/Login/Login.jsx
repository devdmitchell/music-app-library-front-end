import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import "./Login.css"


function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" })   
  const [error, setError] = useState("")
  const navigate = useNavigate()             //this hook is for navigating to different routes after logging in successfully

  //handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3000/login", credentials)    // POST request to the backend login
      localStorage.setItem("token", response.data.token)      //stores auth token that was received in local storage
      toast.success('User Logged In.')
      navigate("/dashboard")            //takes user to dashboard after logging in successfully
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-header">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            autoComplete="off"
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <button className="login-button">Login</button>
        </form>
        <p className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  )
}

export default Login
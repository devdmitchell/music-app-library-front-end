import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./Register.css"

function Register() {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3000/register", credentials)
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="register-container">
      <div className="register-form-box">
        <h2 className="register-header">Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
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
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <button className="register-button">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register
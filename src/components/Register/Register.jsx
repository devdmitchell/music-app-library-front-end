import { useState } from "react"
import "./Register.css"
import { isAlphanumeric, isEmail } from "validator"
import axios from "../../utils/Axios"
import { Slide, toast } from "react-toastify"

function Register() {
  // State for form inputs
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // State for errors
  const [usernameError, setUsernameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordConfirmError, setPasswordConfirmError] = useState("")

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    // Validation checks
    if (!isAlphanumeric(username)) {
      setUsernameError("Username must be alphanumeric.")
    } else {
      setUsernameError("")
    }

    if (!isEmail(email)) {
      setEmailError("Email must be valid.")
    } else {
      setEmailError("")
    }

    if (password !== confirmPassword) {
      setPasswordConfirmError("Passwords must match.")
    } else {
      setPasswordConfirmError("")
    }

    // Only proceed if no errors
    if (
      usernameError.length === 0 &&
      emailError.length === 0 &&
      passwordConfirmError.length === 0
    ) {
      try {
        const response = await axios.post("/register", {
          username,
          email,
          password,
        })

        if (response.data) {
          setUsername("")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
          toast.success("User Registered Successfully!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Slide,
          })
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Registration Failed", {
          position: "top-center",
          autoClose: 2000,
        })
      }
    }
  }

  return (
    <div className="container">
      <div className="form-text">Register</div>
      <div className="form-div">
        <form className="form" onSubmit={handleOnSubmit}>
          <div className="form-group-block">
            <div className="block-container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="errorMessage">{usernameError}</div>
            </div>
          </div>

          <div className="form-group-block">
            <div className="block-container">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="errorMessage">{emailError}</div>
            </div>
          </div>

          <div className="form-group-block">
            <div className="block-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group-block">
            <div className="block-container">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                 autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="errorMessage">{passwordConfirmError}</div>
            </div>
          </div>

          <div className="button-container">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
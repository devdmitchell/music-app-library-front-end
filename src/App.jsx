import React, { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import MainRouter from "./MainRouter"
import { jwtDecode } from "jwt-decode"
import setAxiosAuthToken from "./utils/setAxiosAuthToken"
import "./App.css"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get the token from localStorage
    const token = window.localStorage.getItem("token")
    if (token) {
      try {
        // Decode the token to get user information
        const decoded = jwtDecode(token)
        // Check if the token is still valid (not expired)
        if (decoded.exp > Date.now() / 1000) {
          setUser({
            username: decoded.username,
            email: decoded.email,
            id: decoded.id,
          })
          // Set the token in Axios with the "Bearer" prefix
          setAxiosAuthToken("Bearer " + token)
        } else {
          // Token is expired; remove it
          window.localStorage.removeItem("token")
        }
      } catch (error) {
        // If decoding fails, remove the token
        window.localStorage.removeItem("token")
      }
    }
  }, [])

  const handleUserLogin = (user) => {
    setUser(user)
  }

  const handleUserLogout = () => {
    setUser(null)
    window.localStorage.removeItem("token")
    setAxiosAuthToken(null)
  }

  return (
    <div style={{ width: "100vw" }}>
      <ToastContainer position="top-center" />
      <MainRouter
        user={user}
        handleUserLogin={handleUserLogin}
        handleUserLogout={handleUserLogout}
      />
    </div>
  )
}

export default App
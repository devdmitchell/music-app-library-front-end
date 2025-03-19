import Register from "./components/Register/Register";
import './App.css'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import MainRouter from "./MainRouter"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import setAxiosAuthToken from "./utils/setAxiosAuthToken"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const jwt = window.localStorage.getItem('token')          //checks for jwt
    const currentUser = jwt ? jwtDecode(jwt) : null          // sets user info if jwt exists
    if (currentUser && currentUser.exp > (Date.now() / 1000)) {
      setUser({
        username: currentUser.username,
        email: currentUser.email,
        id: currentUser.id
      })
      setAxiosAuthToken(jwt)
    } else {
      window.localStorage.removeItem('token')    //if expired, remove jwt
    }
  }, [])

  const handleUserLogin = (user) => {
    setUser(user)
  }

  const handleUserLogout = () => {
    setUser(null)
    window.localStorage.removeItem('token')
    setAxiosAuthToken(null)
  }

  return (
    <div style={{width: "100vw"}}>
      <ToastContainer position="top-center" />
      <MainRouter 
        user={user} 
        handleUserLogout={handleUserLogout}
        handleUserLogin={handleUserLogin}
      />
    </div>
  )
}

export default App
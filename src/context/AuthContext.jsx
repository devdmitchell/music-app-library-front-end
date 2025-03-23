import { createContext, useContext, useState, useEffect } from 'react'
import Axios from '../api/Axios'
import setAxiosAuthToken from '../api/setAxiosAuthToken'
import { toast } from 'react-toastify'

const AuthContext = createContext()    //Creates the actual AuthContext object — the "container" for my shared auth data.

export const AuthProvider = ({ children }) => {   //the Context Provider. It wraps around my whole app and supplies user, login, etc. to any component that calls useAuth().
  const [user, setUser] = useState(null)    //user: stores the currently logged-in user object.
  const [loading, setLoading] = useState(true)   //loading: used to prevent rendering the app until we verify token/auth status.

  useEffect(() => {
    const token = localStorage.getItem('token')   //Runs once on mount to check if a token is stored in the browser.
    if (token) {
      setAxiosAuthToken(token)   //If the token exists, attach it to Axios' default headers.
      Axios.get('/auth/me')    //Send request to backend to get user info (/auth/me route)
        .then(res => setUser(res.data.user))   //If successful, store user data in state.
        .catch(() => {      //If that request fails (bad token, expired, etc.), remove token and clear header.
          localStorage.removeItem('token')
          setAxiosAuthToken(null)
        })
        .finally(() => setLoading(false))   //Regardless, mark loading as false so app can finish rendering.
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (formData) => {
    try {
      const { data } = await Axios.post('/auth/login', formData)     //Takes a login form object and sends it to the backend, if successful, receives a token and user info.
      localStorage.setItem('token', data.token)  //Stores the token in local storage
      setAxiosAuthToken(data.token)    //sets it for Axios
  
      // Fetch the authenticated user after login
      const res = await Axios.get('/auth/me')
      setUser(res.data.user)    //Immediately fetch the current user after logging in to update state.
  
      toast.success('Logged in successfully')
      return true
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
      return false
    }
  }   //Shows success/failure toasts and returns a boolean so the component knows what happened.

  const logout = () => {
    localStorage.removeItem('token')
    setAxiosAuthToken(null)
    setUser(null)
    toast.info('Logged out successfully')
  }     //Removes the token from storage and Axios, clears user, and shows a message.

  const register = async (formData) => {
    try {
      await Axios.post('/auth/register', formData)
      toast.success('Registration successful. Please login.')
      return true
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
      return false
    }
  }    //Sends registration form to backend. On success, asks user to login manually. On failure, shows error.

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}> {/*Exposes all auth-related values and functions to the rest of my app. */}
      {!loading && children}   {/*App children are only rendered after we know whether the user is authenticated (!loading). */}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
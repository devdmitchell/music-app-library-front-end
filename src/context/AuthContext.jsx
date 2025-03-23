import { createContext, useContext, useState, useEffect } from 'react'
import Axios from '../api/Axios'
import setAxiosAuthToken from '../api/setAxiosAuthToken'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAxiosAuthToken(token)
      Axios.get('/auth/me')
        .then(res => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem('token')
          setAxiosAuthToken(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (formData) => {
    try {
      const { data } = await Axios.post('/auth/login', formData)
      localStorage.setItem('token', data.token)
      setAxiosAuthToken(data.token)
  
      // Fetch the authenticated user after login
      const res = await Axios.get('/auth/me')
      setUser(res.data.user)
  
      toast.success('Logged in successfully')
      return true
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setAxiosAuthToken(null)
    setUser(null)
    toast.info('Logged out successfully')
  }

  const register = async (formData) => {
    try {
      await Axios.post('/auth/register', formData)
      toast.success('Registration successful. Please login.')
      return true
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
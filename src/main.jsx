import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(   
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)



//authentication context (AuthProvider):
//It gives every component access to user, login, logout, etc., via the useAuth() hook.
//This is how my app knows if someone is logged in and can protect routes.
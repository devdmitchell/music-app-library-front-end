import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './MainRouter'

function App() {
  const [user, setUser] = useState(null)

  const handleUserLogin = (userData) => setUser(userData)
  const handleUserLogout = () => setUser(null)

  return (
    <BrowserRouter>
      <MainRouter
        user={user}
        handleUserLogin={handleUserLogin}
        handleUserLogout={handleUserLogout}
      />
    </BrowserRouter>
  )
}

export default App
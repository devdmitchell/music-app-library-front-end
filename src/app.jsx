import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './MainRouter'
import Nav from './src/components/Nav'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <MainRouter />
    </BrowserRouter>
  )
}

export default App
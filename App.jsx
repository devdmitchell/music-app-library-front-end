import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import AddEditSong from './components/AddEditSong'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />   
        <Route path="/register" element={<Register />} />         
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/song/:id?" element={<AddEditSong />} />
      </Routes>
    </Router>
  )
}

export default App
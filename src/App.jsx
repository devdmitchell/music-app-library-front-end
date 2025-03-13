import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from "./components/Login/Login"
import AddEditSong from "./components/AddEditSong/AddEditSong"
import Dashboard from "./components/Dashboard/Dashboard"
import Register from './components/Register/Register'


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
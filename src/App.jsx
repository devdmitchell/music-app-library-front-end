import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from "./src/components/Login/Login"
import Register from './src/components/Register/Register'
import Dashboard from "./src/components/Dashboard/Dashboard"
import AddEditSong from './src/components/AddEditSong/AddEditSong'



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
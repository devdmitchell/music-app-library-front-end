import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/Home/Home'
import SignUp from './components/SignUp/SignUp'
import Nav from './components/Nav/Nav'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import LogIn from './components/Login/Login'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Profile from './components/Profile/Profile'
import AddEditSong from './components/AddEditSong/AddEditSong'
import Dashboard from './components/Dashboard/Dashboard'
import Register from './components/Register/Register'

// Main Router for the Music App
function MainRouter({ user, handleUserLogin, handleUserLogout }) {
  return (
    <Router>
      <Nav user={user} handleUserLogout={handleUserLogout} />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/music' element={
          <PrivateRoute>
            <MusicPlayer />
          </PrivateRoute>
        } />
        <Route path='/' element={<LogIn handleUserLogin={handleUserLogin} />} />
        <Route path='/login' element={
          user ? <Navigate to="/music" /> :
            <LogIn handleUserLogin={handleUserLogin} />
        } />
        <Route path='/profile' element={
          <PrivateRoute>
            <Profile userID={user?.id} />
          </PrivateRoute>
        } />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/song/:id?' element={<AddEditSong />} />
      </Routes>
    </Router>
  )
}

export default MainRouter
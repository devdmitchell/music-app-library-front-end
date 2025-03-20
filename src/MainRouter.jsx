import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import LogIn from './components/Login/Login'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Profile from './components/Profile/Profile'
import AddEditSong from './components/AddEditSong/AddEditSong'
import Dashboard from './components/Dashboard/Dashboard'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import SongsPage from './Pages/SongsPage'


// Main Router for the Music App
function MainRouter({ user, handleUserLogin, handleUserLogout }) {
  return (
    <Router>
      <Nav user={user} handleUserLogout={handleUserLogout} />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/music' element={
          <PrivateRoute>
            <MusicPlayer/>
          </PrivateRoute>
        } />
        <Route path='/' element={<LogIn handleUserLogin={handleUserLogin} />} />
        <Route path='/login' element={
          user ? <Navigate to="/music" /> :
            <LogIn handleUserLogin={handleUserLogin} />
        } />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={
          <PrivateRoute>
            <Profile userID={user?.id} />
          </PrivateRoute>
        } />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/song/:id?' element={<AddEditSong />} />
        <Route path='/songs' element={<SongsPage />} />
      </Routes>
    </Router>
  )
}

export default MainRouter
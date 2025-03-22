import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Login from './components/Login'
import Register from './components/Register'
import PrivateRoute from './components/PrivateRoute'
import Profile from './components/Profile'
import AddEditSong from './components/AddEditSong'
import Dashboard from './components/Dashboard'
import MusicPlayer from './components/MusicPlayer'
import AlbumSearch from './components/AlbumSearch'
import SongsPage from './Pages/SongsPage'
import Home from './components/Home'

function MainRouter({ user, handleUserLogin, handleUserLogout }) {
  return (
    <Router>
      <Nav user={user} handleUserLogout={handleUserLogout} />
      <Routes>
        <Route path="/" element={<Login handleUserLogin={handleUserLogin} />} />
        <Route path="/login" element={
          user ? <Navigate to="/dashboard" /> : <Login handleUserLogin={handleUserLogin} />
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/song/:id?" element={<PrivateRoute><AddEditSong /></PrivateRoute>} />
        <Route path="/music" element={<PrivateRoute><MusicPlayer /></PrivateRoute>} />
        <Route path="/album-search" element={<PrivateRoute><AlbumSearch /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile userID={user?.id} /></PrivateRoute>} />
        <Route path="/songs" element={<PrivateRoute><SongsPage /></PrivateRoute>} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default MainRouter

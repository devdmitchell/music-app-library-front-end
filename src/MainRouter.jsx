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

function MainRouter({ user, handleUserLogin, handleUserLogout }) {    //function that receives 3 props  
  return (
    <Router>
      <Nav user={user} handleUserLogout={handleUserLogout} />  {/*renders my nav component at the top of all pages. Why do i have to put comments like this*/} 
      <Routes>
        <Route path="/" element={<Login handleUserLogin={handleUserLogin} />} />  {/*root path to render login screen, this component gets the handleUserLogin callback to update the app state */}
        {/* if a logged-in user tried to access /login, they get redirected to /dashboard via Navigate, otherwise they see the login page */}
        <Route path="/login" element={ 
          user ? <Navigate to="/dashboard" /> : <Login handleUserLogin={handleUserLogin} />
        } />
        <Route path="/register" element={<Register />} />  {/* renders the register component */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />   {/* wraps dashboard in a private route so it is only accessible if the user is logged in */}
        <Route path="/song/:id?" element={<PrivateRoute><AddEditSong /></PrivateRoute>} />  {/* handles /song & /song/:id paths for adding or editing a song. The optional :id? means the id may or may not be present, not required */}
        <Route path="/music" element={<PrivateRoute><MusicPlayer /></PrivateRoute>} />    {/* renders the music player component, which is protected behind login */}
        <Route path="/album-search" element={<PrivateRoute><AlbumSearch /></PrivateRoute>} /> {/* route to my last.fm powered album search feature, only for users who are authenticated */}
        <Route path="/profile" element={<PrivateRoute><Profile userID={user?.id} /></PrivateRoute>} /> {/*my profile route, passes the userID to the profile component, it is protected behind login */}
        <Route path="/songs" element={<PrivateRoute><SongsPage /></PrivateRoute>} /> {/* this pages shows the user's saved songs, it is a protected page */}
        <Route path="/home" element={<Home />} />  {/*this is not protected, it is the public home route */}
        <Route path="*" element={<Navigate to="/" />} />  {/* this is a wildcard route, that catches all unknown urls and renders a not found page, which is useful for 404s */}
      </Routes>   {/*closes out routes */}
    </Router>
  )
}

export default MainRouter



//user: the current authenticated user (or null)
//handleUserLogin: function to set the user when logging in
//handleUserLogout: function to log out the user

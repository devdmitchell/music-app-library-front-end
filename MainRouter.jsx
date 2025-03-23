import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Nav from './src/components/Nav/Nav'
import Login from './src/components/Login/Login'
import Register from './src/components/Register/Register'
import PrivateRoute from './src/components/PrivateRoute/PrivateRoute'
import Profile from './src/components/Profile/Profile'
import AddEditSong from './src/components/AddEditSong/AddEditSong'
import Dashboard from './src/components/Dashboard/Dashboard'
import MusicPlayer from './src/components/MusicPlayer/MusicPlayer'
import SongsPage from './src/Pages/SongsPage'
import AlbumSearch from './src/components/Album/AlbumSearch'
import Home from './src/components/Home/Home'
import './App.css'

function MainRouter({ user, handleUserLogin, handleUserLogout }) { // function that receives 3 props
  const isAuthenticated = Boolean(user); // Determine authentication status based on the user object

  return (
    <>
      <Nav user={user} handleUserLogout={handleUserLogout} /> {/* renders my nav component at the top of all pages */}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login handleUserLogin={handleUserLogin} />
            )
          }
        /> {/* root path to render login screen, this component gets the handleUserLogin callback to update the app state */}
        {/* if a logged-in user tries to access /login, they get redirected to /dashboard via Navigate; otherwise, they see the login page */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login handleUserLogin={handleUserLogin} />
            )
          }
        />
        <Route path="/register" element={<Register />} /> {/* renders the register component */}

        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}> {/* wraps protected routes in a private route so they are only accessible if the user is logged in */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/song/:id?" element={<AddEditSong />} /> {/* handles /song & /song/:id paths for adding or editing a song; the optional :id? means the id may or may not be present */}
          <Route path="/music" element={<MusicPlayer />} /> {/* renders the music player component, which is protected behind login */}
          <Route path="/album-search" element={<AlbumSearch />} /> {/* route to my last.fm powered album search feature, only for users who are authenticated */}
          <Route path="/profile" element={<Profile userID={user?.id} />} /> {/* my profile route, passes the userID to the profile component, it is protected behind login */}
          <Route path="/songs" element={<SongsPage />} /> {/* this page shows the user's saved songs, it is a protected page */}
        </Route>

        <Route path="/home" element={<Home />} /> {/* this is not protected, it is the public home route */}
        <Route path="*" element={<Navigate to="/" />} /> {/* this is a wildcard route that catches all unknown URLs and renders a not found page, which is useful for 404s */}
      </Routes> {/* closes out routes */}
    </>
  )
}

export default MainRouter

// user: the current authenticated user (or null)
// handleUserLogin: function to set the user when logging in
// handleUserLogout: function to log out the user

import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Profile from './components/Profile/Profile'
import AddEditSong from './components/AddEditSong/AddEditSong'
import Dashboard from './components/Dashboard/Dashboard'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import SongsPage from './Pages/SongsPage'
import AlbumSearch from './components/Album/AlbumSearch'
import Home from './components/Home/Home'
import { useAuth } from './context/AuthContext' // useAuth pulls in current auth state from context
import './App.css'



function MainRouter() { // main routing component
  const { user, logout } = useAuth() // pull in user and logout directly from AuthContext using the useAuth() hook , user will be null if user isnt logged in, logout allows any component using this router to log the user out
  const isAuthenticated = Boolean(user) // check if the user is logged in (truthy), coverts the user into a simple boolean: if user exists, isAuthenticated will be true. if user is null, it will be false

  return (
  <>        { /*a React fragment, used to wrap multiple elements without adding extra nodes to the DOM.*/}
      <Nav user={user} handleUserLogout={logout} /> {/* renders my nav component at the top of all pages, Two props are being passed: user: so the nav can display "Login/Register" or "Dashboard/Logout" conditionally. handleUserLogout: allows the nav to log the user out when the logout button is clicked.  */}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login />
            )
          }
        /> {/* root path redirects to dashboard if logged in, otherwise shows login */}

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login />
            )
          }
        /> {/* login page is also protected from authenticated users */}

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

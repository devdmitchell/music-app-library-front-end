import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute

//Defines a functional component called PrivateRoute that takes a prop isAuthenticated.
//This prop tells us if the user is logged in or not (usually a boolean).
//This line uses a ternary (inline if statement): return isAuthenticated ? <Outlet /> : <Navigate to="/login"
//If the user is authenticated, render whatever child route(s) exist under this route using <Outlet />.
//If the user is not authenticated, redirect them to the /login page using <Navigate to="/login" />.
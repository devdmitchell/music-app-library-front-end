import { Navigate } from "react-router-dom"
import { checkIfUserIsAuth } from "../../utils/checkIfUserIsAuth"

function PrivateRoute({ children }) {               //protect routes & ensure only auth users have access
  const isAuthenticated = checkIfUserIsAuth()

  return isAuthenticated ? children : <Navigate to="/login" />            //if auth reder children components, otherwise go back to login page
}

export default PrivateRoute
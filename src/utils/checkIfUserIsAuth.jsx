import { jwtDecode } from "jwt-decode";
import setAxiosAuthToken from './setAxiosAuthToken'



export const checkIfUserIsAuth = () =>{
    // check if JWT exist
    const jwt = window.localStorage.getItem('jwt')
    if(jwt){
        // check not expired
        const currentTime = Date.now() / 1000
        const decodedJwt = jwtDecode(jwt)
        // return boolean
       const valid = decodedJwt.exp > currentTime
       if(!valid){
        setAxiosAuthToken(null)
       }
       return valid
    }else{
        setAxiosAuthToken(null)
        return false
    }
}


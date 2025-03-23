import Axios from './Axios'

const setAxiosAuthToken = (jwt)=>{    //function that accepts a JWT string
    // check if jwt is truthy
    if(jwt){   //if a valid JWT token is provided
        // attach headers
        Axios.defaults.headers.common.Authorization = `Bearer ${jwt}`   //sets the global Axios Authorization header to include the token
    }else{   //if no token is provided, it removes the authorization header entirely
        //if not, delete header
        delete Axios.defaults.headers.common.Authorization
    }   //typically during logout or an expired session
}

export default setAxiosAuthToken


// this configures Axios to automatically send a JWT token with all http requests, this is used for authenticating protected backend routes
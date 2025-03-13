import Axios from './Axios'

const setAxiosAuthToken = (jwt)=>{
    // check if jwt is truthy
    if(jwt){
        // attach headers
        Axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
    }else{
        //if not, delete header
        delete Axios.defaults.headers.common.Authorization
    }
}

export default setAxiosAuthToken
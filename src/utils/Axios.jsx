import axios from "axios"

// Axios Instance
const Axios = axios.create({
  baseURL: "http://localhost:3000/api",  
  timeout: 50000,   // If server hangs for more than 50 seconds
})

export default Axios

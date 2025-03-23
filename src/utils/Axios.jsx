import axios from "axios"

// Axios Instance
const Axios = axios.create({
  baseURL: "http://localhost:3000/api",  
  timeout: 50000,   // If server hangs for more than 50 seconds
})

export default Axios

// this creates a custom Axios instance. This is useful because I can reuse it across my app instead of configuring Axios manually every time.
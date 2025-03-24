const API_URL = 'http://localhost:3000/api/songs/get-all-songs'

export const fetchSongs = async () => {   //can be used in other files (to load songs into a component).
  try {
    const token = localStorage.getItem('token')    //Retrieves the user's JWT token from local storage (used to authenticate the request).
    if (!token) {
      console.error('No token found! User may not be logged in')
      return []
    }   //If the token doesn't exist, logs an error and returns an empty array to prevent the app from breaking.

    const response = await fetch(API_URL, {      //Sends a GET request to the API URL to retrieve all songs.
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  
      }
    })   //Sets headers: Content-Type: tells the server we're expecting JSON. Authorization: adds the token as a Bearer token so the server knows who the user is.

    if (!response.ok) throw new Error('Failed to fetch songs')  //If the response status is not 2xx, throw an error with a custom message.

    return await response.json()    //Parses and returns the response as a JavaScript object.
  } catch (error) {
    console.error('Error fetching songs:', error)
    return []
  }
}   //If anything fails during the request, logs the error and returns an empty array.
const API_KEY = import.meta.env.VITE_LAST_FM_API_KEY // Use Vite environment variables Grabs Last.fm API key from a .env file using Vite's import.meta.env system.
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/'



export const searchAlbum = async (albumName) => {    //takes an album name as a parameter.
    // console.log("Hello")
  try {
    const response = await fetch(`${BASE_URL}?method=album.search&album=${encodeURIComponent(albumName)}&api_key=${API_KEY}&format=json`)  //Makes a GET request to the Last.fm API.

    if (!response.ok) {
      throw new Error('Failed to fetch album data')
    }  //If the response is not successful, throws a custom error.

    const data = await response.json()   //Converts the JSON response into a JavaScript object.
    return data.results.albummatches.album     //Returns the array of albums found in the response.
  } catch (error) {
    console.error('Error fetching album data:', error)
    return []
  }
}   //If there's an error during the fetch or processing, logs it and returns an empty array to avoid breaking the app.



//search track function
export const searchTrack = async (trackName) => {
  try {
    const response = await fetch(`${BASE_URL}?method=track.search&track=${encodeURIComponent(trackName)}&api_key=${API_KEY}&format=json`)  //Constructs the API request for track search.
    if (!response.ok) throw new Error('Failed to fetch track data')    //Validates that the response was successful.

    const data = await response.json()   //Parses the JSON response.
    return data.results.trackmatches.track    //Returns the array of matched tracks.
  } catch (error) {
    console.error('Error fetching track data:', error)
    return []
  }
}  //Handles errors by logging and returning an empty array.


//Makes a GET request to the Last.fm API.
//method=album.search: tells the API to search for albums.
//album=${encodeURIComponent(albumName)}: safely encodes the album name (handles spaces and special characters).
//api_key=${API_KEY}: passes API key.
//format=json: asks for the response in JSON format.


//searchAlbum: Searches albums by name.
//searchTrack: Searches tracks by name.
//Both use the same structure and safely handle errors and API responses.
import { useState, useEffect } from 'react'
import Axios from '../api/Axios'

const useSongs = (searchQuery = '') => {   //Declares a custom hook named useSongs. It optionally accepts a searchQuery string (defaults to an empty string). can use this for searching/filtering songs.
  const [songs, setSongs] = useState([])   //Initializes a songs state variable to hold the fetched songs (starts empty).
  const [loading, setLoading] = useState(true)  //A loading state that starts as true to show a loading indicator while songs are being fetched.
  const [error, setError] = useState(null)   //An error state to hold any error that may occur during the fetch request.

  const fetchSongs = async () => {   //this function will handle calling to my backend to retrieve songs.
    try {
      const url = searchQuery
        ? `/songs/get-all-songs?search=${encodeURIComponent(searchQuery)}`   //constructs a URL. If a search query is provided, it appends a query string (?search=...). encodeURIComponent safely escapes any special characters (e.g., spaces, &, ?, etc.)
        : '/songs/get-all-songs'

      const { data } = await Axios.get(url)  //Sends a GET request to the backend using Axios and destructures the response to get data
      setSongs(data)    //Stores the returned data into the songs state variable.
    } catch (err) { //catches any errors and returns a response
      setError(err)
    } finally {
      setLoading(false)    // Whether it succeeds or fails, stop showing the loading spinner/message.
    }
  }

  useEffect(() => {     //hook runs when the component using useSongs mounts or when searchQuery changes.
    fetchSongs()   //Calls fetchSongs() to load new data.
  }, [searchQuery])   //The dependency array [searchQuery] ensures the effect re-runs on query changes.

  return { songs, loading, error, fetchSongs } //hook returns an object 
}

export default useSongs

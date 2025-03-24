import React, { useEffect, useState } from 'react'
import { fetchSongs } from '../api/SongsApi'


const SongsPage = () => {
  const [songs, setSongs] = useState([])   //Initializes state songs as an empty array to store song data once it's fetched.
  const [loading, setLoading] = useState(true) //A loading state, initially true, used to show a loading message while the fetch is happening.
  const [error, setError] = useState(null) // An error state to capture and display any fetch-related errors.

  useEffect(() => {    // hook runs once after the component mounts (because the dependency array is [])
    const loadSongs = async () => {
      try {
        const data = await fetchSongs()   // awaits the response from the fetchSongs() API call
        setSongs(data)     //Stores the fetched data in state so the component can render it.
      } catch (error) { //catches any errors and returns a response
        setError(error.message)
      } finally {
        setLoading(false)          // Whether it succeeds or fails, stop showing the loading spinner/message.
      }
    }

    loadSongs()
  }, [])      //Calls loadSongs() and ensures it runs only once (because the dependency array is empty).

  if (loading) return <p>Loading songs...</p>    //While data is being fetched, show a loading message.
  if (error) return <p>Error: {error}</p>    // If there’s an error, display the error message.


  // This renders the actual content
  return (
    <div>
      <h1>Songs</h1>  
      <ul>
        {songs.map(song => (
          <li key={song._id}>{song.title} by {song.artist}</li>    
        ))}
      </ul>
    </div>
  )
}

export default SongsPage
{/*heading */}
{/*A list of each song with its title and artist using .map() over the songs array. */}
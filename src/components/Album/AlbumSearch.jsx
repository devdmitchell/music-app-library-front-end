import React, { useState } from 'react'
import { searchAlbum } from '../../api/lastFmApi'
import { toast } from 'react-toastify'
import './AlbumSearch.css'

const AlbumSearch = () => {
  const [albumName, setAlbumName] = useState('')    //Initializes albumName state to hold the user's input from the search field.
  const [albums, setAlbums] = useState([])  //Initializes an empty array to hold the search results returned from the Last.fm API.
  const [loading, setLoading] = useState(false) //Tracks the loading state ( while waiting for the API call to complete).

//function to handle the search logic when the user clicks the "Search" button.
  const handleSearch = async () => {
    if (!albumName.trim()) {
      toast.info('Please enter an album name to search.')
      return
    }    //If the input is empty or only whitespace, it shows a toast notification and stops further execution.

    setLoading(true)   //Indicates the app is currently fetching data.
    try {
      const results = await searchAlbum(albumName)
      setAlbums(results)    //Calls searchAlbum (an async function from your API utility) with the album name and stores the results in state.
    } catch (error) {
      toast.error('Error searching albums.')     //If the API call fails, it shows an error toast message.
    } finally {
      setLoading(false)
    }        //Regardless of success or failure, it sets loading to false once the operation is complete.
  }

  return (
    <div className="album-search-container">
      <h2>Search for an Album</h2>
      <input
        type="text"
        placeholder="Enter album name..."
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading ? (
        <p>Loading albums...</p>
      ) : (
        <ul className="album-results">
          {albums.map((album, index) => (
            <li key={index}>
              <strong>{album.name}</strong> by {album.artist} <br />
              <a href={album.url} target="_blank" rel="noopener noreferrer">View on Last.fm</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AlbumSearch


// line 32-37 : Renders a text input field. It's a controlled component using albumName state. onChange updates the state as the user types.

// line 38 : Clicking the button triggers the album search function.

// line 40-41 : While the albums are being fetched, this message is displayed.

//line 42-50 : Once loading is complete and albums exist: Maps through the albums array. Displays each album’s name and artist. Includes a link to the album’s Last.fm page. target="_blank" opens in a new tab. rel="noopener noreferrer" is for security and performance.


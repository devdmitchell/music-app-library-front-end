import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSongs from '../../hooks/useSongs'
import { searchAlbum } from '../../api/lastFmApi'
import Axios from '../../api/Axios'
import { toast } from 'react-toastify'
import './Dashboard.css'

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('')   //Initializes state to hold the user's search input for Last.fm.
  const [lastFmResults, setLastFmResults] = useState([])   //Stores the results returned from the Last.fm album search.
  const { songs, loading, error, fetchSongs } = useSongs()  //Custom hook that provides: list of user's saved songs, loading status, error status,  function to refetch songs from backend
  const navigate = useNavigate()   //Hook from react-router-dom used to programmatically navigate to other pages.

  //Function that deletes a song by ID when called.
  const handleDelete = async (id) => {  
    try {
      await Axios.delete(`/songs/delete-song-by-id/${id}`)    ////Makes a DELETE request to backend API to delete the song.
      toast.success('Song deleted successfully.')     //Shows success toast notification.
      fetchSongs()      //Refreshes the song list after deletion.
    } catch (err) {
      toast.error('Error deleting song.')      //Catches and shows error toast if something fails.
    }
  }

  // Last.fm Album Search Handler
  const handleLastFmSearch = async (e) => {
    e.preventDefault()    //Prevents page reload on form submit.
    const results = await searchAlbum(searchTerm)
    setLastFmResults(results)
  }    //Calls searchAlbum function with the search term and updates the results.


  //Displays fallback content if songs are still loading or if there was an error.
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading songs.</p>

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">🎧 Music Dashboard</h1>

      <section className="playlist-section">
        <h2>My Playlist</h2>
        <button className="add-song-button" onClick={() => navigate('/song')}>
          + Add New Song
        </button>
        {songs.length === 0 ? (
          <p>No songs found.</p>
        ) : (
          <ul>
            {songs.map((song) => (
              <li key={song._id} className="song-item">
                <span>{song.title} - {song.artist}</span>
                <div>
                  <button className="edit-button" onClick={() => navigate(`/song/${song._id}`)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(song._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="lastfm-section">
        <h2>Search Music (Last.fm)</h2>
        <form onSubmit={handleLastFmSearch} className="search-form">
          <input
            type="text"
            placeholder="Search albums..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        {lastFmResults.length > 0 && (
          <div className="search-results">
            <ul>
              {lastFmResults.map((album, index) => (
                <li key={index}>
                  <strong>{album.name}</strong> by {album.artist}
                  {album.image?.[1]?.['#text'] && (
                    <img src={album.image[1]['#text']} alt={album.name} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}

export default Dashboard


//Button to navigate to the Add/Edit Song form.
//Checks if there are songs to display. If not, it says "No songs found".
//Displays the song title and artist.
//Each song has edit and delete buttons. Clicking edit takes you to /song/:id route to edit that specific song.

//Last.fm Search Section
//Renders a search input form to allow album search through Last.fm API.
//Text input is controlled by searchTerm, updated as the user types. On submit, it calls handleLastFmSearch.

// Last.fm Results List
//If results exist, it renders them as a list.  Each result shows album name and artist. f an album has cover art, it displays the album image as well.
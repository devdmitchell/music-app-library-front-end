import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSongs from '../../hooks/useSongs'
import { searchAlbum } from '../../api/lastFmApi'
import Axios from '../../api/Axios'
import { toast } from 'react-toastify'
import './Dashboard.css'

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [lastFmResults, setLastFmResults] = useState([])
  const { songs, loading, error, fetchSongs } = useSongs()
  const navigate = useNavigate()

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/songs/delete-song-by-id/${id}`)
      toast.success('Song deleted successfully.')
      fetchSongs()
    } catch (err) {
      toast.error('Error deleting song.')
    }
  }

  const handleLastFmSearch = async (e) => {
    e.preventDefault()
    const results = await searchAlbum(searchTerm)
    setLastFmResults(results)
  }

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
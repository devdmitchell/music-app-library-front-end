import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { searchAlbum } from "../../api/lastFmApi" // Last.fm fetch function
import "./Dashboard.css"

function Dashboard() {
  const [songs, setSongs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [lastFmResults, setLastFmResults] = useState([])
  const navigate = useNavigate()

  const fetchSongs = async (query = "") => {
    try {
      const token = localStorage.getItem("token")
      let url = "http://localhost:3000/api/songs/get-all-songs"
      if (query) {
        url += `?search=${query}`
      }
      const response = await axios.get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      setSongs(response.data)
    } catch (err) {
      console.error("Error fetching songs:", err)
    }
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`http://localhost:3000/api/songs/delete-song-by-id/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      setSongs(songs.filter(song => song._id !== id))
    } catch (error) {
      console.error("Error deleting song:", error)
    }
  }

  const handleLastFmSearch = async (e) => {
    e.preventDefault()
    const results = await searchAlbum(searchTerm)
    setLastFmResults(results)
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">🎧 Music Dashboard</h1>

      <section className="playlist-section">
        <h2> My Playlist</h2>
        <button className="add-song-button" onClick={() => navigate("/song")}>
          + Add New Song
        </button>
        {songs.length === 0 ? (
          <p>No songs found.</p>
        ) : (
          <ul>
            {songs.map((song) => (
              <li key={song._id} className="song-item">
                <span>{song.title} - {song.artist}</span>
                <button className="edit-button" onClick={() => navigate(`/song/${song._id}`)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(song._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="lastfm-section">
        <h2> Search Music (Last.fm)</h2>
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
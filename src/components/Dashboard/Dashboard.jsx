import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./Dashboard.css"

function Dashboard() {
  const [songs, setSongs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
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

  const handleSearch = (e) => {
    e.preventDefault()
    fetchSongs(searchTerm)
  }


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

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Your Songs</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search songs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      
      <button
        className="add-song-button"
        onClick={() => navigate("/song")}
      >
        Add New Song
      </button>
      {songs.length === 0 ? (
        <p>No songs found. Try adding some songs or modifying your search.</p>
      ) : (
        <ul>
          {songs.map((song) => (
            <li key={song._id} className="song-item">
              <span>{song.title} - {song.artist}</span>
              <button
                className="edit-button"
                onClick={() => navigate(`/song/${song._id}`)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(song._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dashboard
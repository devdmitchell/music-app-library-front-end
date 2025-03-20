import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./Dashboard.css"

function Dashboard() {
  const [songs, setSongs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  // Function to fetch songs 
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

  // Fetch all songs on component mount
  useEffect(() => {
    fetchSongs()
  }, [])

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault()
    fetchSongs(searchTerm)
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Your Songs</h1>
      {/* Search bar */}
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
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dashboard
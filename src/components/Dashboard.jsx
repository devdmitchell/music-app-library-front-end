import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Dashboard() {
  const [songs, setSongs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:5000/songs", {
          headers: { Authorization: token },
        })
        setSongs(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchSongs()
  }, [])

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Your Songs</h1>
      <button
        className="add-song-button"
        onClick={() => navigate("/song")}
      >
        Add New Song
      </button>
      <ul>
        {songs.map((song) => (
          <li key={song._id} className="song-item">
            <span>{song.title} - {song.artist}</span>
            <button className="delete-button" onClick={async () => {
              await axios.delete(`http://localhost:5000/songs/${song._id}`, {
                headers: { Authorization: localStorage.getItem("token") },
              });
              setSongs(songs.filter(s => s._id !== song._id))
            }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"


function AddEditSong() {
  const [song, setSong] = useState({ title: "", artist: "" })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:3000/songs", song, {
      headers: { Authorization: localStorage.getItem("token") },
    })
    navigate("/dashboard")
  }

  return (
    <div className="song-container">
      <div className="song-form-box">
        <h2 className="song-header">Add Song</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="input-field"
            onChange={(e) => setSong({ ...song, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Artist"
            className="input-field"
            onChange={(e) => setSong({ ...song, artist: e.target.value })}
          />
          <button className="save-button">Save</button>
        </form>
      </div>
    </div>
  )
}

export default AddEditSong
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./AddEditSong.css"

function AddEditSong() {
  const [song, setSong] = useState({ title: "", artist: "" })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const method = song._id ? "put" : "post"  // see if song already has an ID
    const url = song._id
      ? `http://localhost:5000/songs/${song._id}`         // for existing song (PUT request)
      : "http://localhost:3000/songs"                     // for new song (POST request)
  
    await axios[method](url, song, {
      headers: { Authorization: localStorage.getItem("token") },        //sends the stored token for auth
    })
    navigate("./Dashboard/Dashboard")
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
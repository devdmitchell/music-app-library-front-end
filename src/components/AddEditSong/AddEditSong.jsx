import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import axios from "axios"
import "./AddEditSong.css"
import { toast } from "react-toastify"

function AddEditSong() {
  const [song, setSong] = useState({ title: "", artist: "" })
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSong = async () => {
      if (id) {
        const token = localStorage.getItem("token")
        const response = await axios.get(`http://localhost:3000/api/songs/${id}`, {
          headers: { Authorization: "Bearer " + token },
        })
        setSong(response.data)
      }
    }
    fetchSong()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const method = id ? "put" : "post"
      const url = id
        ? `http://localhost:3000/api/songs/update-song-by-id/${id}`
        : "http://localhost:3000/api/songs/add-song"

      const token = localStorage.getItem("token")
      await axios[method](url, song, {
        headers: { Authorization: "Bearer " + token },
      })
      toast.success("Song saved successfully.")
      navigate("/dashboard")
    } catch (error) {
      console.error(error)
      toast.error("There was an error saving the song.")
    }
  }
  return (
    <div className="song-container">
      <div className="song-form-box">
        <h2 className="song-header">{song._id ? "Edit Song" : "Add Song"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="input-field"
            value={song.title || ""}
            onChange={(e) => setSong({ ...song, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Artist"
            className="input-field"
            value={song.artist || ""}
            onChange={(e) => setSong({ ...song, artist: e.target.value })}
          />
          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddEditSong
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from '../../api/Axios'
import { toast } from 'react-toastify'
import './AddEditSong.css'

function AddEditSong() {
  const [song, setSong] = useState({ title: '', artist: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      const fetchSong = async () => {
        setLoading(true)
        try {
          const { data } = await Axios.get(`/songs/${id}`)
          setSong(data)
        } catch (error) {
          toast.error('Error fetching song details.')
        } finally {
          setLoading(false)
        }
      }
      fetchSong()
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (song._id) {
        await Axios.put(`/songs/update-song-by-id/${song._id}`, song)
        toast.success('Song updated successfully.')
      } else {
        await Axios.post('/songs/add-song', song)
        toast.success('Song added successfully.')
      }
      navigate('/dashboard')
    } catch (error) {
      toast.error('There was an error saving the song.')
    }
  }

  const handleChange = (e) => {
    setSong(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (loading) return <p>Loading song details...</p>

  return (
    <div className="song-container">
      <div className="song-form-box">
        <h2 className="song-header">{song._id ? 'Edit Song' : 'Add Song'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="input-field"
            value={song.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="artist"
            placeholder="Artist"
            className="input-field"
            value={song.artist}
            onChange={handleChange}
            required
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
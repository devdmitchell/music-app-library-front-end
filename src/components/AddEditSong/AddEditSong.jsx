import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from '../../api/Axios'
import { toast } from 'react-toastify'
import './AddEditSong.css'

function AddEditSong() {
  const [song, setSong] = useState({ title: '', artist: '' })  //Initializes the song state with empty title and artist fields.
  const [loading, setLoading] = useState(false)    //Tracks whether the page is in a loading state (e.g., fetching song details).
  const navigate = useNavigate()    //React Router hook for programmatic navigation (like going to the dashboard after saving).
  const { id } = useParams()    //Retrieves the song ID from the URL (/song/123). If id is undefined, it's an "Add Song" view. If id exists, it's "Edit Song."



  useEffect(() => {
    if (id) {     //Runs this effect only if there’s a song id, meaning we’re in "edit" mode.
      const fetchSong = async () => {
        setLoading(true)    //Starts loading before making the API request.
        try {
          const { data } = await Axios.get(`/songs/${id}`)   //Fetches the existing song data from the backend using the id.
          setSong(data)    //Sets that data in state to pre-fill the form.
        } catch (error) {
          toast.error('Error fetching song details.')    //If something goes wrong, shows a toast message.
        } finally {
          setLoading(false)    //finally ends the loading state whether the request was successful or not.


        }
      }
      fetchSong()      //The effect only runs again if id changes.
    }
  }, [id])


  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()    //Prevents the default form submission behavior (refresh).
    try {
      if (song._id) {
        await Axios.put(`/songs/update-song-by-id/${song._id}`, song)   //If the song already has an _id, it's in edit mode. Sends a PUT request to update it.
        toast.success('Song updated successfully.')
      } else {
        await Axios.post('/songs/add-song', song)       //If there's no _id, it creates a new song via POST.
        toast.success('Song added successfully.')
      }
      navigate('/dashboard')      //After a successful save, navigate the user back to the dashboard.
    } catch (error) {
      toast.error('There was an error saving the song.')      //If saving fails, display an error message.
    }
  }



  //handles form input changes 
  const handleChange = (e) => {
    setSong(prev => ({ ...prev, [e.target.name]: e.target.value }))     //Updates the corresponding field (title or artist) when the user types.
  }

  if (loading) return <p>Loading song details...</p>      //Shows a loading message while fetching song data.

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
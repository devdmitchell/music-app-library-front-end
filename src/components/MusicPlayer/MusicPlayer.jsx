import React, { useState } from 'react'
import Axios from '../api/Axios'
import SongList from './SongList'
import { toast } from 'react-toastify'
import './MusicPlayer.css'

function MusicPlayer() {
  const [textInput, setTextInput] = useState('')
  const [songList, setSongList] = useState([])
  const [loading, setLoading] = useState(false)

  const handleOnSearch = async (e) => {
    e.preventDefault()
    if (!textInput.trim()) {
      toast.info('Please enter a song name to search.')
      return
    }

    setLoading(true)
    try {
      const { data } = await Axios.get(`/search?query=${encodeURIComponent(textInput.trim())}`)
      setSongList(data)
    } catch (error) {
      toast.error('Error searching for songs.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="music-player-container">
      <div id="mainApp">
        <form onSubmit={handleOnSearch}>
          <input
            type="text"
            placeholder="Search for a song..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div id="songListContainer">
        <h3>Coolest Music App</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <SongList songList={songList} />
        )}
      </div>
    </div>
  )
}

export default MusicPlayer

import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SongList from './SongList'
import "./MusicPlayer.css" 

function Music() {
  const [textInput, setTextInput] = useState('')
  const [songList, setSongList] = useState([])

  const handleOnSearch = async (e) => {
    e.preventDefault()
    setTextInput('')
    try {
      const response = await axios.get(`http://localhost:5000/songs?search=${textInput}`)
      setSongList(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div id="mainApp">
        <input
          type="text"
          placeholder="Search for a song..."
          name="song"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <button onClick={handleOnSearch}>Search</button>
      </div>
      <div id="songListContainer">
        <h3>Coolest Music App</h3>
        <div>
          <SongList songList={songList} />
        </div>
      </div>
    </div>
  )
}

export default Music
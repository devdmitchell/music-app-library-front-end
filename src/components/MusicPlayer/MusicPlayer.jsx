import axios from 'axios'
import React, { useState } from 'react'
import SongList from './SongList'
import "./MusicPlayer.css" 

function MusicPlayer() {
  const [textInput, setTextInput] = useState('')
  const [songList, setSongList] = useState([])

  const handleOnSearch = async (e) => {
    e.preventDefault()
    try {
      const query = textInput // preserve the query for searching
      const token = localStorage.getItem("token")
      const response = await axios.get(`http://localhost:3000/api/songs/get-all-songs?search=${query}`, {
        headers: { Authorization: "Bearer " + token },
      })
      setSongList(response.data)
     setTextInput('')  //clear input after search:
    } catch (error) {
      console.error("Error searching for songs:", error)
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

export default MusicPlayer
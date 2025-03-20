import React, { useEffect, useState } from 'react'
import { fetchSongs } from '../api/songsApi'

const SongList = () => {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    const loadSongs = async () => {
      const data = await fetchSongs()
      setSongs(data)
    }
    loadSongs();
  }, [])

  return (
    <div>
      <h2>Song List</h2>
      {songs.length === 0 ? (
        <p>No songs found.</p>
      ) : (
        <ul>
          {songs.map((song) => (
            <li key={song._id}>
              <strong>{song.title}</strong> by {song.artist}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SongList
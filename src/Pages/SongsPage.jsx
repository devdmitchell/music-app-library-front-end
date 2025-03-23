import React, { useEffect, useState } from 'react'
import { fetchSongs } from '../api/SongsApi'


const SongsPage = () => {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const data = await fetchSongs()
        setSongs(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadSongs()
  }, [])

  if (loading) return <p>Loading songs...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Songs</h1>
      <ul>
        {songs.map(song => (
          <li key={song._id}>{song.title} by {song.artist}</li>
        ))}
      </ul>
    </div>
  )
}

export default SongsPage
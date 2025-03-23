import React from 'react'
import './SongsPage.css'
import useSongs from '../hooks/useSongs'

const SongsPage = () => {
  const { songs, loading, error } = useSongs()

  if (loading) return <p>Loading songs...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="songs-page">
      <h1>Song List</h1>
      {songs.length === 0 ? (
        <p>No songs available.</p>
      ) : (
        <ul className="songs-list">
          {songs.map(song => (
            <li key={song._id} className="song-item">
              <h2>{song.title}</h2>
              <p><strong>Artist:</strong> {song.artist}</p>
              <p><strong>Album:</strong> {song.album || 'Unknown Album'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SongsPage

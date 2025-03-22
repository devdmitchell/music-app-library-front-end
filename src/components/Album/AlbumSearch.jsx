import React, { useState } from 'react'
import { searchAlbum } from '../../api/lastFmApi'

const AlbumSearch = () => {
  const [albumName, setAlbumName] = useState('')
  const [albums, setAlbums] = useState([])

  const handleSearch = async () => {
    if (albumName.trim() === '') return
    const results = await searchAlbum(albumName)
    setAlbums(results)
  }

  return (
    <div>
      <h2>Search for an Album</h2>
      <input
        type="text"
        placeholder="Enter album name..."
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {albums.map((album, index) => (
          <li key={index}>
            <strong>{album.name}</strong> by {album.artist} <br />
            <a href={album.url} target="_blank" rel="noopener noreferrer">View on Last.fm</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AlbumSearch
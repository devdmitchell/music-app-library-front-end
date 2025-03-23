import React, { useState } from 'react'
import { searchAlbum } from '../../api/lastFmApi'
import { toast } from 'react-toastify'
import './AlbumSearch.css'

const AlbumSearch = () => {
  const [albumName, setAlbumName] = useState('')
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!albumName.trim()) {
      toast.info('Please enter an album name to search.')
      return
    }

    setLoading(true)
    try {
      const results = await searchAlbum(albumName)
      setAlbums(results)
    } catch (error) {
      toast.error('Error searching albums.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="album-search-container">
      <h2>Search for an Album</h2>
      <input
        type="text"
        placeholder="Enter album name..."
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading ? (
        <p>Loading albums...</p>
      ) : (
        <ul className="album-results">
          {albums.map((album, index) => (
            <li key={index}>
              <strong>{album.name}</strong> by {album.artist} <br />
              <a href={album.url} target="_blank" rel="noopener noreferrer">View on Last.fm</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AlbumSearch
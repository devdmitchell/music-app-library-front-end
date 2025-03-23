import React from 'react'

function SongList({ songList }) {
  if (!songList.length) return <p>No results found.</p>

  return (
    <ul className="song-list">
      {songList.map((song, index) => (
        <li key={index}>
          {song.cover && <img src={song.cover} alt={song.title} width={50} height={50} style={{ marginRight: '10px' }} />}
          <strong>{song.title}</strong> by {song.artist}
        </li>
      ))}
    </ul>
  )
}

export default SongList

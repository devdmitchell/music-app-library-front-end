import React from 'react'

function SongList({ songList }) {
if (!songList.length) return <p>No results found.</p>     //If songList is empty (meaning no songs), show a simple message saying “No results found.”

return (
  <ul className="song-list">   {/*  Start rendering an unordered list ul with the class name song-list */}
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

  // a functional component called SongList. It takes a prop called songList, which is expected to be an array of song objects.


  {/* loops through each song list using .map, song is current song, index is its position in the array which is used for the key */}
{/*renders a list item for each song, react uses key=index to keep track of each item in the list */}
{/* if song has a cover image show it, width 50px & add space so it isn't squished up against the text */}

{/*shows song title in bold, then it is followed by artist name */}
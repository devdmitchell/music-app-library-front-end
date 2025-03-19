import { Link } from "react-router-dom"


function SongList({ songList }) {
  return songList.map((song) => {
    return (
      <div key={song._id}>
        <Link to={`/song/${song._id}`}>
          <div>
            <img className="albumCover" src={song.albumCover} alt={song.title} />
          </div>
          <div>
            Title: {song.title}
            <br />
            Artist: {song.artist}
            <br />
            Year: {song.year}
          </div>
        </Link>
      </div>
    )
  })
}

export default SongList
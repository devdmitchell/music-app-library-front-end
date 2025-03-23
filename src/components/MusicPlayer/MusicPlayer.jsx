import React, { useState } from 'react'
import Axios from '../../api/Axios'
import SongList from '../SongList/SongList'
import { toast } from 'react-toastify'
import './MusicPlayer.css'

function MusicPlayer() {
  const [textInput, setTextInput] = useState('')  //textInput: Holds the current value in the search box. setTextInput: Function to update that value.
  const [songList, setSongList] = useState([]) //songList: Holds the array of search results (songs). setSongList: Used to update the song results.
  const [loading, setLoading] = useState(false)  //loading: Tracks whether a search is currently happening.  setLoading: Updates the loading state.

  const handleOnSearch = async (e) => {    //Declares an async function to handle search form submission.
    e.preventDefault()    //Prevents the default browser behavior of reloading the page on form submit.
    if (!textInput.trim()) {
      toast.info('Please enter a song name to search.')
      return
    }   //If the input is empty or just whitespace, show a toast message and stop.

    setLoading(true)    //Set the loading state to true to show a loading message.
    try {
      const { data } = await Axios.get(`/search?query=${encodeURIComponent(textInput.trim())}`)  //Make a GET request to the backend with the search query. Use encodeURIComponent to safely encode the query.
      setSongList(data)   //Store the results in songList.
    } catch (error) {
      toast.error('Error searching for songs.')    //If an error occurs, show an error toast.
    } finally {
      setLoading(false)    
    }    //Whether success or failure, loading is set to false.
  }

  return (
    <div className="music-player-container">
      <div id="mainApp">
        <form onSubmit={handleOnSearch}>
          <input
            type="text"
            placeholder="Search for a song..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div id="songListContainer">
        <h3>Coolest Music App</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <SongList songList={songList} />
        )}
      </div>
    </div>
  )
}

export default MusicPlayer


//The trim() method of String values removes whitespace from both ends of this string and returns a new string, without modifying the original string.

//Top-level div with a class for styling the whole music player.
//A wrapper div and a <form> that runs handleOnSearch when submitted.
//A controlled input field bound to textInput. Updates its value on user typing using setTextInput.

//A submit button that triggers the search when clicked or "Enter" is pressed.

//line 44 - Section heading above the results.
//If loading is true, show a "Loading..." message. Otherwise, show the <SongList /> component and pass in the search results (songList).
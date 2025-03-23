import { useState, useEffect } from 'react'
import Axios from '../api/Axios'

const useSongs = (searchQuery = '') => {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSongs = async () => {
    try {
      const url = searchQuery
        ? `/songs/get-all-songs?search=${encodeURIComponent(searchQuery)}`
        : '/songs/get-all-songs'

      const { data } = await Axios.get(url)
      setSongs(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSongs()
  }, [searchQuery])

  return { songs, loading, error, fetchSongs }
}

export default useSongs

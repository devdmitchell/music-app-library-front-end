const API_KEY = import.meta.env.VITE_LAST_FM_API_KEY // Use Vite environment variables
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/'



export const searchAlbum = async (albumName) => { 
    // console.log("Hello")
  try {
    const response = await fetch(`${BASE_URL}?method=album.search&album=${encodeURIComponent(albumName)}&api_key=${API_KEY}&format=json`)

    if (!response.ok) {
      throw new Error('Failed to fetch album data')
    }

    const data = await response.json()
    return data.results.albummatches.album
  } catch (error) {
    console.error('Error fetching album data:', error)
    return []
  }
}
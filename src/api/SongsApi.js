const API_URL = 'http://localhost:5000/api/songs/get-all-songs'

export const fetchSongs = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (!response.ok) throw new Error('Failed to fetch songs')

    return await response.json()
  } catch (error) {
    console.error('Error fetching songs:', error)
    return []
  }
}
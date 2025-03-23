const API_URL = 'http://localhost:3000/api/songs/get-all-songs'

export const fetchSongs = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('No token found! User may not be logged in')
      return []
    }

    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  
      }
    })

    if (!response.ok) throw new Error('Failed to fetch songs')

    return await response.json()
  } catch (error) {
    console.error('Error fetching songs:', error)
    return []
  }
}
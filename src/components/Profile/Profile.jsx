
import React, { useEffect, useState } from 'react'
import Axios from '../api/Axios'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import './Profile.css'

function Profile() {
  const { user } = useAuth()
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await Axios.get(`/user/get-user-by-id/${user?.id}`)
        setProfileData(data.payload)
      } catch (error) {
        toast.error('Failed to fetch profile information.')
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) fetchUserProfile()
  }, [user])

  const handleChange = (e) => {
    setProfileData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const updateUserProfile = async (e) => {
    e.preventDefault()
    try {
      const { data } = await Axios.put(`/user/update-user-by-id/${user.id}`, profileData)
      toast.success(data.message || 'Profile updated successfully.')
    } catch (error) {
      toast.error('Failed to update profile.')
    }
  }

  if (loading) return <p>Loading profile...</p>

  return (
    <div className='update-container'>
      <h3>Update Profile</h3>
      <form onSubmit={updateUserProfile}>
        <div className='input-div'>
          <input type="text" name='firstName' onChange={handleChange} value={profileData.firstName} placeholder="First Name" />
        </div>
        <div className='input-div'>
          <input type="text" name='lastName' onChange={handleChange} value={profileData.lastName} placeholder="Last Name" />
        </div>
        <div className='input-div'>
          <input type="email" name='email' onChange={handleChange} value={profileData.email} placeholder="Email" />
        </div>
        <div className='input-div'>
          <input type="text" name='username' onChange={handleChange} value={profileData.username} placeholder="Username" />
        </div>
        <div className='button-div'>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  )
}

export default Profile


import React, { useEffect, useState } from 'react'
import Axios from '../../api/Axios'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import './Profile.css'

function Profile() {
  const { user } = useAuth()    //Destructures the user object from the auth context (the currently logged-in user).
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: ''
  })  //Sets up local state for the user’s profile data (initially blank).
  const [loading, setLoading] = useState(true)  //Tracks whether the profile data is still loading from the backend.


  //Runs code when the component mounts or when user changes.
  useEffect(() => {
    const fetchUserProfile = async () => {           //Defines an async function to fetch the user profile from the backend.
      try {
        const { data } = await Axios.get(`/user/get-user-by-id/${user?.id}`)        //Makes an authenticated request using the user's ID.
        setProfileData(data.payload)        //Updates the state with the profile data returned from the backend.
      } catch (error) {
        toast.error('Failed to fetch profile information.')   //Shows an error toast if the API call fails.
      } finally {
        setLoading(false)
      }    //Whether success or failure, loading is set to false.
    }

    if (user?.id) fetchUserProfile()          
  }, [user])    //Runs fetchUserProfile() only if a user ID exists.

  const handleChange = (e) => {
    setProfileData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }    //Updates profileData when form fields are changed.

  const updateUserProfile = async (e) => {
    e.preventDefault()    //Prevents the form from reloading the page.
    try {
      const { data } = await Axios.put(`/user/update-user-by-id/${user.id}`, profileData)
      toast.success(data.message || 'Profile updated successfully.')     //Sends the updated profile data to the server using a PUT request.
    } catch (error) {
      toast.error('Failed to update profile.')
    }
  }   //Shows a toast notification based on the result.

  if (loading) return <p>Loading profile...</p>      //Renders a loading message while data is being fetched

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




//Renders the update form.
//input block - Renders an input field for profile info. value is bound to state and updates via handleChange.
//button block - Submits the form and triggers the update handler.

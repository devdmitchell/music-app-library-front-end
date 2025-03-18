import { useEffect, useState } from 'react'
import './Profile.css'
import Axios from '../../utils/Axios'
import { toast } from 'react-toastify'

function Profile({ userID }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  // Fetch user data when userID changes
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (userID) {
          const response = await Axios.get(`/user/get-user-by-id/${userID}`)
          const { firstName, lastName, email, username } = response.data.payload
          setFirstName(firstName)
          setLastName(lastName)
          setEmail(email)
          setUsername(username)
        }
      } catch (error) {
        console.error(error)
        toast.error('Failed to fetch user information.')
      }
    }
    getUserInfo()
  }, [userID])

  // Update user data with server call
  const updateUser = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios.put(`/user/update-user-by-id/${userID}`, {
        firstName,
        lastName,
        email,
        username
      })
      toast.success(response.data.message)
    } catch (error) {
      console.error(error)
      toast.error('Failed to update user information.')
    }
  }

  return (
    <div>
      <div className='update-container'>
        <h3>Update Profile</h3>
        <form onSubmit={updateUser}>
          <div className='input-div'>
            <input type="text" name='firstName' onChange={e => setFirstName(e.target.value)} value={firstName} placeholder="First Name" />
          </div>
          <div className='input-div'>
            <input type="text" name='lastName' onChange={e => setLastName(e.target.value)} value={lastName} placeholder="Last Name" />
          </div>
          <div className='input-div'>
            <input type="email" name='email' onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" />
          </div>
          <div className='input-div'>
            <input type="text" name='username' onChange={e => setUsername(e.target.value)} value={username} placeholder="Username" />
          </div>
          <div className='button-div'>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile

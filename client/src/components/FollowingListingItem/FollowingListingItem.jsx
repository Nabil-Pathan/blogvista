import React, { useState } from 'react'
import { useThemeContext } from '../../context/ThemeContext';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';


const FollowingListingItem = ({ name, pic, userId }) => {
  const { theme } = useThemeContext()
  const { user } = useUserContext()

  const [isFollowing, setIsFollowing] = useState(true)

  const handleFollowToggle = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      if(isFollowing){
        await axios.post(`/api/user/unfollow/${userId}`, null, config);
        toast.success('Unfollowed successfully!');
      }
      else{
        await axios.post(`/api/user/follow/${userId}`, null, config);
        toast.success('Followed successfully!');
      }
      setIsFollowing(!isFollowing)
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className={`custom-shadow bg-white py-5 px-7  rounded-lg shadow-md flex  items-center justify-between ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <div className="flex items-center justify-center gap-3">
        <Link to={`/profile/${userId}`} className='flex gap-3 items-center justify-center'>
        <img
          src={pic || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'}
          alt={name}
          className="w-12 h-12 object-cover rounded-full "
        />
        <h2 className="text-lg font-semibold">{name}</h2>
        </Link>
      </div>
      <div className="ml-3">
        <button onClick={handleFollowToggle} className="bg-teal-600 text-white px-4 py-3 rounded-md font-bold hover:bg-teal-500">{
          isFollowing ? 'Unfollow': 'Follow'
        }</button>
      </div>
    </div>
  )
}

export default FollowingListingItem
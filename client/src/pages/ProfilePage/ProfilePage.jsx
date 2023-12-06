import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import UserPosts from '../../components/UserPosts/UserPosts';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import { useThemeContext } from "../../context/ThemeContext"
import './ProfilePage.css'
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ userProfile , setUserProfile] = useState({})
  const { user } = useUserContext();

  const { theme } = useThemeContext()
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get('/api/blog/getuserposts', config);
      const data = response.data;
      setPosts(data.userBlogPosts);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      toast.error('Some error occurred!');
      setLoading(false);
    }
  };

  const fetchUserProfile = async ()=>{
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user/profile/${user.user._id}`,config)
      setUserProfile(data.user)
    } catch (error) {
       console.log(error.message);
    }
  }
  useEffect(() => {
    fetchUserProfile()
    fetchPosts();
  }, []);

  return (
    <div className={` shadow-lg  p-4  ${theme === 'dark' ? 'dark-theme mt-0 w-[100%]' : 'mt-1 bg-white'}`}>
      <div className="text-center">
        {
          userProfile.pic == "" ?
          (<img
            src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            className="profile-pic border-2 border-indigo-600 rounded-full mx-auto"
          />) :  (
            <img
            src={userProfile.pic}
            className=" profile-pic border-2 border-teal-700 rounded-full mx-auto"
          />
          )
        }
        <h1 className={`${theme === 'dark' ? 'dark-theme' : '' } text-4xl font-semibold mt-2`}>{userProfile.name}</h1>
        <p className={`text-xl  ${theme === 'dark' ? 'dark-theme' : 'text-gray-800' } `}>{userProfile.email}</p>
      </div>

      <div className={`flex space-x-4 items-center justify-center mt-4 ${theme === "dark" ? "dark-theme" : ""}`}>
              <Link to={`/followers/${user.user._id}`} >
                <h2 className={`font-semibold text-xl ${theme === 'dark' ? 'dark-theme' : ''}`}>Followers</h2>
                <p  className={`${theme === 'dark' ? 'dark-theme' : ''} text-xl`}>{userProfile.followers ? userProfile.followers.length : 0}</p>
              </Link>
              <Link to={`/following/${user.user._id}`}>
                <h2 className={`font-semibold text-xl ${theme === 'dark' ? 'dark-theme' : ''}`}>Following</h2>
                <p className={`${theme === 'dark' ? 'dark-theme' : ''} text-xl`}>{userProfile.following ? userProfile.following.length : 0}</p>
              </Link>
            </div>
            {
              posts.length < 1 ? ( <h1 className="mt-5 text-4xl font-bold">No Posts Yet</h1> )

              :(<h1 className="mt-5 text-4xl font-bold">Your Posts</h1>)
      
            }
      <div className="posts-container mt-8">
        {loading ? <Loader /> : <UserPosts posts={posts} />}
      </div>
    </div>
  );
};

export default ProfilePage;


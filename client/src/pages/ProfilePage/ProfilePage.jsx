
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import UserPosts from '../../components/UserPosts/UserPosts';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import { useThemeContext } from "../../context/ThemeContext"
const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={` shadow-lg rounded-lg p-4  ${theme === 'dark' ? 'dark-theme mt-0 w-[100%]' : 'mt-1 bg-white'}`}>
      <div className="text-center">
        <img
          src={user.user.pic}
          alt="User's Profile Picture"
          className="w-24 h-24 border-2 border-indigo-600 rounded-full mx-auto"
        />
        <h1 className={`${theme === 'dark' ? 'dark-theme' : '' } text-4xl font-semibold mt-2`}>{user.user.name}</h1>
        <p className={`text-xl  ${theme === 'dark' ? 'dark-theme' : 'text-gray-800' } `}>{user.user.email}</p>
      </div>

      <h1 className="mt-5 text-4xl font-bold">Your Posts</h1>
      <div className="posts-container mt-8">
        {loading ? <Loader /> : <UserPosts posts={posts} />}
      </div>
    </div>
  );
};

export default ProfilePage;


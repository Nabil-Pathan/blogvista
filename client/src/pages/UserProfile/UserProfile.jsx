import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { useThemeContext } from '../../context/ThemeContext';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import BlogPost from '../../components/BlogPost/BlogPost';
import { toast } from 'react-hot-toast';

const UserProfile = () => {
  const { userId } = useParams();
  const { theme } = useThemeContext();
  const { user } = useUserContext();

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);

  const fetchUser = async () => {
    console.log("Logged-in user ID:", user.user._id);
    console.log("User ID from URL:", userId);
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user/profile/${userId}`, config);
      setUserProfile(data.user);
      const postsResponse = await axios.get(`/api/blog/user/${userId}`, config);
      setUserPosts(postsResponse.data.blogPosts);

      // Check if the logged-in user is following the displayed user
      setIsFollowing(data.user.followers.includes(user.user._id));
      setIsCurrentUserProfile(user.user._id === userId)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // Fetch user data only on component mount

  const handleFollowToggle = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // If already following, unfollow; otherwise, follow
      if (isFollowing) {
        await axios.post(`/api/user/unfollow/${userId}`, null, config);
        toast.success('Unfollowed successfully!');
      } else {
        await axios.post(`/api/user/follow/${userId}`, null, config);
        toast.success('Followed successfully!');
      }

      // Toggle the following state
      setIsFollowing(!isFollowing);
      // Fetch the updated user profile after following/unfollowing
      const updatedProfileResponse = await axios.get(`/api/user/profile/${userId}`, config);
      const updatedProfile = updatedProfileResponse.data.user;

      // Update the local state with the updated user profile
      setUserProfile(updatedProfile);
    } catch (error) {
      console.log(error.message);
      toast.error('Operation failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center  p-4 ${theme === 'dark' ? 'dark-theme' : 'mt-16 bg-gray-100'}`}>
      {loading ? (
        <Loader />
      ) : (
        userProfile && (
          <>
            <h1 className={`text-4xl font-bold mb-4  ${theme === 'dark' ? 'dark-theme' : 'text-teal-700'}`}>{userProfile.name}'s Profile</h1>
            <img
             src={`${userProfile.pic === "" ? "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" : userProfile.pic}`} 
             alt={userProfile.name} className="w-32 h-32 rounded-full mb-4 object-cover" />
            <p className={` mb-4 ${theme === 'dark' ? 'dark-theme' : 'text-gray-700'}`}>Email: {userProfile.email}</p>

            {/* Display user details */}
            <div className="flex space-x-4">
              <div>
                <h2 className={`font-semibold ${theme === 'dark' ? 'dark-theme' : ''}`}>Followers</h2>
                <p className={`${theme === 'dark' ? 'dark-theme' : ''}`}>{userProfile.followers.length}</p>
              </div>
              <div>
                <h2 className={`font-semibold ${theme === 'dark' ? 'dark-theme' : ''}`}>Following</h2>
                <p className={`${theme === 'dark' ? 'dark-theme' : ''}`}>{userProfile.following.length}</p>
              </div>
            </div>

            {/* Follow/Unfollow button */}
            {!isCurrentUserProfile && (
              <div className="mt-3">
                <button onClick={handleFollowToggle} className={`${theme === 'dark' ? 'bg-teal-500 hover:bg-teal-400' : 'bg-teal-700 text-white hover:bg-teal-500'} px-5 py-3 rounded-md `}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            )}

            {/* Display user posts */}
            <div className="w-[100%] mt-8">
              <div className="mt-5">
                <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  <div className="blog-posts-container">
                    {userPosts.map((post, index) => (
                      <BlogPost key={post._id} id={post._id} title={post.title} date={post.date} content={post.content} image={post.image} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default UserProfile;

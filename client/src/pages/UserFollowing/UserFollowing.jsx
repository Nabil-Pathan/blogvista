import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import FollowingListingItem  from "../../components/FollowingListingItem/FollowingListingItem"
import Loader from "../../components/Loader/Loader"
import { useThemeContext } from '../../context/ThemeContext';

const UserFollowing = () => {
  const { user } = useUserContext();
  const { theme } = useThemeContext()

  const params = useParams();

  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFollowers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const { data } = await axios.get(`/api/user/following/${params.userId}`, config);
      if (Array.isArray(data.following)) {
          setFollowing(data.following);
      } else {
        toast.error('Invalid data received');
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchFollowers();
  }, [params.userId, user.token]);

  return (
    <div className={`h-screen w-full  items-center  flex flex-col  ${theme === 'dark' ? 'dark-theme' : ''}`}>
      {loading ? (
          <Loader/>
      ) : (
        <div className={`flex  md:w-[40%] sm:w-full  flex-col gap-4 ${theme === 'dark' ? 'dark-theme' : ''}`}>
          <h1 className=" mt-10 text-3xl font-bold">Following</h1>
          {following.map((f) => (
            <div className={`${theme === 'dark' ? 'dark-theme' : ''}`}  key={f._id}>
              <div> 
              <FollowingListingItem name={f.name} pic={f.pic} userId={f._id}/>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserFollowing;

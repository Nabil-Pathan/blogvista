

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import FollowersListingItem  from "../../components/FollowersLitingItem/FollowersListingItem"
import Loader from "../../components/Loader/Loader"

const UserFollowers = () => {
  const { user } = useUserContext();
  const params = useParams();

  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      try {
        const { data } = await axios.get(`/api/user/followers/${params.userId}`, config);
        if (Array.isArray(data.followers)) {
          setFollowers(data.followers);
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
    fetchFollowers();
  }, [params.userId, user.token]);

  return (
    <div className="h-screen w-full  items-center  flex flex-col mt-10">
      {loading ? (
          <Loader/>
      ) : (
        <div className="flex  w-[70%] flex-col gap-4">
          <h1 className="text-3xl font-bold">Followers</h1>
          {followers.map((follower) => (
            <div  key={follower._id}>
              <Link to
              ={`/profile/${follower._id}`}>
              <FollowersListingItem name={follower.name} pic={follower.pic} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserFollowers;



import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import FollowingListingItem  from "../../components/FollowingListingItem/FollowingListingItem"
import Loader from "../../components/Loader/Loader"

const UserFollowing = () => {
  const { user } = useUserContext();
  const params = useParams();

  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchFollowers();
  }, [params.userId, user.token]);

  return (
    <div className="h-screen w-full  items-center  flex flex-col mt-10">
      {loading ? (
          <Loader/>
      ) : (
        <div className="flex  w-[70%] flex-col gap-4">
          <h1 className="text-3xl font-bold">Following</h1>
          {following.map((f) => (
            <div  key={f._id}>
              <Link to
              ={`/profile/${f._id}`}>
              <FollowingListingItem name={f.name} pic={f.pic} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserFollowing;

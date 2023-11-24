import React, { useEffect, useState } from 'react';
import BlogPost from '../BlogPost/BlogPost';
import './UserPosts.css';
import UserBlogPost from '../UserBlogPost/UserBlogPost';


const UserPosts = ({ posts }) => {

  const [ userposts , setUserPosts] = useState(posts)

  const onPostDeleted = (postId) => {
    // Remove the post with the matching postId from the posts array.
    const updatedPosts = posts.filter((post) => post._id !== postId);
    setUserPosts(updatedPosts);
  };

  const onPostUpdated = (updatedPost) =>{
    // Create a Copy userposts array
    const updatedUserPosts = [...userposts];

    const index = updatedUserPosts.findIndex((post) => post._id === updatedPost._id);

    if (index !== -1) {
      // If the post is found, replace it with the updated post
      updatedUserPosts[index] = updatedPost;
  
      // Update the state with the new array
      setUserPosts(updatedUserPosts);
    }
  }

  return (
    <>
    
        <div className="mt-5">
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="blog-posts-container">
            {userposts.map((post, index) => (
              <UserBlogPost
                postId={post._id}
                key={index}
                title={post.title}
                date={post.date}
                content={post.content}
                image={post.image}
                onPostDeleted={onPostDeleted}
                onPostUpdated={onPostUpdated}
              />
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default UserPosts;

import React, { useState } from 'react';
import '../../pages/Allposts/Allposts.css'
import './UserBlogPost.css'
import DeletePostModal from '../DeletePostModal/DeletePostModal';
import UpdatePostModal from '../UpdatePostModal/UpdatePostModal';
import { useThemeContext } from "../../context/ThemeContext"

const UserBlogPost = ({ title, date, content, image , postId , onPostDeleted , onPostUpdated}) => {
 
  const [deleteModal , setDeleteModal] = useState(false)
  const [updateModal , setUpdateModal] = useState(false)

  const { theme } = useThemeContext()

  return (
    <>
    <div className={`${theme === 'dark' ? 'dark-theme hover:bg-gray-900' : '' } rounded-lg cursor-pointer custom-shadow-1 blog-post  transform hover:scale-105 transition-transform `}>
      <h2 className={`${theme === 'dark' ? 'dark-theme' : 'text-teal-800' }  text-2xl font-bold mb-2 `}>{title}</h2>
      {image && <img src={image} alt={title} className="blog-post-image" />}
      <p className={`${theme === 'dark' ? 'dark-theme' : 'text-gray-500' }  `}>{date}</p>
      <p className={`${theme === 'dark' ? 'dark-theme' : 'text-gray-700' }   my-4`}>{content}</p>
      <button className="text-indigo-600 hover:underline">Read More</button>

      <div className="button-container">
      <button className="update-button" onClick={()=> setUpdateModal(true)}>
          <i className="material-icons">create</i> Edit
        </button>
        <button className="delete-button" onClick={()=> setDeleteModal(true)} >
          <i className="material-icons">delete</i> Delete
        </button>
      </div>
    </div>
    {
        deleteModal && <DeletePostModal postId={postId} setDeleteModal={setDeleteModal} onPostDeleted={onPostDeleted}  />
      }

      {
            updateModal && <UpdatePostModal postId={postId} title={title} content={content} setUpdateModal={setUpdateModal} onPostUpdated={onPostUpdated}/>
      }
</>
  );
};

export default UserBlogPost;
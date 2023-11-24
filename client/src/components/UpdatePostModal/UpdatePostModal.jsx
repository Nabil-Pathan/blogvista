import React, { useState } from 'react'
import "./UpdatePostModal.css"
import axios from 'axios';
import {  toast } from "react-hot-toast"
import { useUserContext } from "../../context/UserContext"

const UpdatePostModal = ({postId , setUpdateModal , title , content , onPostUpdated}) => {


  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const { user } = useUserContext()
  const handleUpdatePost = async () => {

    try {
   
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const updatedData = {
      title: newTitle, // Use the updated title from state
      content: newContent, // Use the updated content from state
      // Add other fields if needed
    };

    const { data } = await axios.put(`/api/blog/update/${postId}`, updatedData , config)

    const updatedPost = data.blogPost
    setUpdateModal(false);
    onPostUpdated(updatedPost)
    toast.success('Post Updated')
  } catch (error) {
     console.log(error.message);   
  }
  };
  
  return (
    <>
    <div className="text-black modal-wrapper">
  <div className="modal-container bg-white rounded-lg shadow-lg p-4">
    <button className="absolute text-3xl top-2 right-2 p-2 rounded-md shadow-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600" onClick={()=> setUpdateModal(false)}>
      X
    </button>
    <label className="text-xl font-bold mb-2">Title</label>
    <input type="text" className="border border-gray-500 rounded-md px-3 py-2 mb-4" 
     value={newTitle}
     onChange={(e)=> setNewTitle(e.target.value)}
    />
    <label className="text-xl font-bold mb-2">Content</label>
    <textarea className="border border-gray-500 rounded-md px-3 py-2 mb-4 h-20"
    value={newContent}
    onChange={(e)=> setNewContent(e.target.value)}
    ></textarea>
    <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 rounded-md mb-2" onClick={handleUpdatePost}>
      Update
    </button>
    <button className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 rounded-md shadow-lg" onClick={()=> setUpdateModal(false)}>
      Cancel
    </button>
  </div>
</div>

</>
  )
}

export default UpdatePostModal
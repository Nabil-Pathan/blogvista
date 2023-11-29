import React, { useState } from 'react';
import './DeletePostModal.css'
import axios from "axios"
import { useUserContext } from "../../context/UserContext"
import { toast } from "react-hot-toast"
import { useNavigate} from "react-router-dom"


const DeletePostModal = ({ setDeleteModal , postId , onPostDeleted }) => {

  const { user } = useUserContext()


  const navigate = useNavigate()

  const handleDeletePost = async() =>{
    try {
      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      }
      setDeleteModal(false)
       await axios.delete(`/api/blog/delete/${postId}`, config)
       onPostDeleted(postId)
       toast.success('Post Deleted')
       console.log('Blog Post deleted');
    } catch (error) {
       console.log(error.message);
    }
  }
  return (
    <>
        <div className="text-black modal-wrapper">
        <div className="modal-container">
          <button className="absolute text-3xl top-3 right-3 px-2 py-1 rounded-md  text-gray-700 bg-gray-300 hover:bg-gray-200 hover:text-gray-600 " onClick={()=> setDeleteModal(false)}>X</button>
          <i className="material-icons text-7xl text-red-700">delete</i>
          <h2 className="text-2xl font-bold ">Are Your Sure You Want to Delete the Post</h2>
          <button className="mt-4 bg-red-700 rounded-md hover:bg-red-500 font-bold text-white p-3" onClick={handleDeletePost}>Delete</button>
          <button className="mt-4 bg-gray-300 hover:bg-gray-500 font-bold  p-3 rounded-md shadow-lg  " onClick={() => setDeleteModal(false)}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default DeletePostModal;


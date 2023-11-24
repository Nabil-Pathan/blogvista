import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../../App.css'
import Loader from "../../components/Loader/Loader"
import ImageLoader from "../../components/ImageLoader/ImageLoader"
import axios from "axios"
import {useUserContext} from "../../context/UserContext"
import { useThemeContext } from "../../context/ThemeContext"

const NewBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [loading , setLoading] = useState(false)
  const [imageLoading , setImageLoading] = useState(false)

  const navigate = useNavigate();

  const { user } = useUserContext()

  const { theme } = useThemeContext()

  const postDetails = async (images) =>{

    setImageLoading(true)
     if(images == undefined){
       toast.error('Please select an Image !')
       return
    }

    if(images.type ==="image/jpeg" || images.type ==="image/png"){
      const data = new FormData()
      data.append("file",images)
      data.append("upload_preset","blog-app")
      data.append("cloud_name","dpvicaxva")
      fetch("https://api.cloudinary.com/v1_1/dpvicaxva/image/upload",{
        method: "POST",
        body: data
      }).then((res)=> res.json())
      .then(data =>{
         setImage(data.url.toString())
         console.log(data.url.toString());
         setImageLoading(false)
      })

      .catch((err)=>{
        console.log(err);
        setImageLoading(false)
      })
    }
    
    else{
      toast.error("Please select an image !")
      setImageLoading(false)
      return
    }
  }

  const handleCreateBlog = async () => {
    try {
      setLoading(true)
      if(!title || !content || !image){
         toast.error("All Fields are required !")
      }
      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post("/api/blog/create", {title , content , image} , config)
      toast.success("Post Created")
      setLoading(false)
      navigate('/allposts')
    } catch (error) {
       console.log(error);
       toast.error("Something went wrong")
    }
     
  };

  return (
    <>
    {
      loading ? (<Loader/>) : (
        <div className={`flex flex-col items-center justify-center ${theme === 'dark' && 'dark-theme' }`}>
    <div className=" p-4 sm:p-6 lg:p-8">
      <h2 className={`text-4xl font-extrabold text-center  mb-6 ${theme === 'dark' ? 'dark-theme' : 'text-teal-700' }`}>Create a New Blog Post</h2>
        <div className="mb-4">
          <label className={`${theme === 'dark' ? 'dark-theme' : 'text-gray-700 ' } block text-md font-bold mb-2`} htmlFor="title">
            Title
          </label>
          <input
            className={`shadow-sm  border border-gray-400  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  ${theme === 'dark' ? 'dark-theme' : 'text-gray-900'} `} 
            id="title"
            type="text"
            placeholder="Enter your blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className={`block  text-md font-bold mb-2 ${theme === 'dark' ?'dark-theme' : 'text-gray-700' }`} htmlFor="content">
            Content
          </label>
          <textarea
           className={`shadow-sm  border border-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  ${theme === 'dark' ? 'dark-theme' : 'text-gray-900 '} `} 
            id="content"
            placeholder="Write your blog content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="8"
            required
          />
        </div>
        <div className="mb-4">
          <label className={`block  text-md font-bold mb-2 ${theme === 'dark' ? 'dark-theme' : 'text-gray-700' }`} htmlFor="image">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />

          { imageLoading && <ImageLoader/>}
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleCreateBlog}
          >
            Create Blog
          </button>
        </div>
    </div>
    </div>
      )
    }
    </>
  );
};

export default NewBlogPage;

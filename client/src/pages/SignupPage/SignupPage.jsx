import React, { useState } from 'react';
import '../../App.css'
import { toast } from "react-hot-toast"
import Loader from '../../components/Loader/Loader';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import ImageLoader from "../../components/ImageLoader/ImageLoader"
import { useThemeContext } from "../../context/ThemeContext"
import { useUserContext } from '../../context/UserContext';
const SignupPage = () => {

  const [name , setName ] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [pic , setPic] = useState("")
  const { user , setUser} = useUserContext()

  const [imageLoading , setImageLoading] = useState(false)

  const [loading , setLoading] = useState(false)

  const navigate = useNavigate()

  const { theme } = useThemeContext()

  const postDetails = (pics) =>{
    setImageLoading(true)
    if(pics == undefined){
       toast.error("Please Select an Image !")
    }

    if(pics.type ==="image/jpeg" || pics.type ==="image/png"){
      const data = new FormData()
      data.append("file", pics)
      data.append("upload_preset","blog-app")
      data.append("cloud_name","dpvicaxva")
      

      fetch("https://api.cloudinary.com/v1_1/dpvicaxva/image/upload",{
        method: "POST",
        body: data
      }).then((res)=> res.json())
      .then(data =>{
         setPic(data.url.toString())
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


  const handleSubmit = async ()=>{

    setLoading(true)

    if(!name || !email || !password){
      toast.error('All Fields are required !')
    }
    try {
    const {data} = await axios.post('/api/auth/verify',{ name , email , password , pic})
    toast.success('Opt sent to your email')
    localStorage.setItem("userInfo", JSON.stringify(data))
    setLoading(false)
    navigate('/verify')

  } catch (error) {
      console.log(error);
      setLoading(false)
  }
  }
  return (
    <>

    {
      loading ? (<Loader/>) : (
        <div className={`h-screen flex flex-col items-center justify-center ${theme === 'dark' && 'dark-theme'}`}>
        <div className={`w-full  md:w-1/2 lg:w-1/3 h-4/5 custom-shadow  flex flex-col items-center justify-center mx-auto p-6  rounded-xl shadow-2xl mt-12  ${theme === 'dark' ? 'dark-theme md:border-2 border-white sm:border-none ' : 'bg-white'}`}>
        <h2 className="text-4xl font-semibold text-center mb-4">Sign Up</h2>
          <div className="mb-4">
            <label htmlFor="name" className={`block  ${theme === 'dark' ? 'dark-theme' : 'text-gray-600 '}`}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="text-black w-full p-2 border rounded-lg focus:ring focus:ring-indigo-400"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e)=> setName
              (e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className={`block   ${theme === 'dark' ? 'dark-theme' : 'text-gray-600'}`}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="text-black w-full p-2 border rounded-lg focus:ring focus:ring-indigo-400"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e)=> setEmail
              (e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className={`block  ${theme === 'dark' ? 'dark-theme' : 'text-gray-600 '}`}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="text-black w-full p-2 border rounded-lg focus:ring focus:ring-indigo-400"
              placeholder="Password"
              required
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
          <label className={`block  text-md font-bold mb-2  ${theme === 'dark' ? 'dark-theme' : 'text-gray-700'}`} htmlFor="image">
            Profile Pic
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
          <button
            className="w-[50%] bg-teal-500 text-white font-bold p-2 rounded-lg hover:bg-teal-400 focus:ring focus:ring-teal-400"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
      </div>
      </div>
  
      )
    }
    </>
  );
}

export default SignupPage;

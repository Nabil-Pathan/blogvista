import React, { useState } from 'react';
import '../../App.css'
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { useThemeContext } from "../../context/ThemeContext"

const SigninPage = () => {

  const [loading , setLoading] = useState(false)
  const [ email , setEmail ] = useState("")
  const [ password , setPassword ] = useState("")
  const { user , setUser} = useUserContext()

  const { theme } = useThemeContext()

  const navigate = useNavigate()
  const handleSubmit = async ()=>{
    if(!email || !password){
      toast.error('All Details are required !')
    }
    try {
        setLoading(true)
        const { data } = await axios.post("/api/auth/signin", { email , password})
        localStorage.setItem("userInfo", JSON.stringify(data))
        setLoading(false)
        toast.success("Login success !")
        navigate('/allposts')
    } catch (error) {
       console.log(error);
       setLoading(false)
       toast.error(JSON.stringify(error.message))
    }
  }
  return (
    <>
    {
      loading ? (<Loader />) : (
        <div className={`h-screen flex flex-col items-center justify-center  ${theme === 'dark' && 'dark-theme'}`}>
        <div className={`w-full md:w-1/2 lg:w-1/3 h-4/5 custom-shadow flex flex-col items-center justify-center mx-auto p-6 rounded-xl  mt-12   ${theme === 'dark' ? 'dark-theme' : ' bg-white ' }`}>
        <h2 className="text-4xl font-semibold text-center mb-4">Login</h2>
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
              onChange={(e)=> setEmail(e.target.value)}
              
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className={`block   ${theme === 'dark' ? 'dark-theme' : 'text-gray-600'}`}>Password</label>
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
          <button
            type="submit"
            className="w-[50%] bg-teal-500 text-white font-bold p-2 rounded-lg hover:bg-teal-400 focus:ring focus:ring-indigo-400"
            onClick={handleSubmit}
          >
            Login
          </button>
      </div>
      </div>
  
      )
    }
   
    </>
  );
}

export default SigninPage;

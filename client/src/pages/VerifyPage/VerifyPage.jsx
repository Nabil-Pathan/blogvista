import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../context/UserContext'
import { toast } from 'react-hot-toast'
import axios  from 'axios'
import { useNavigate } from "react-router-dom"
import Loader from '../../components/Loader/Loader'
import { useThemeContext } from "../../context/ThemeContext"

const VerifyPage = () => {
  const [userCode , setUserCode] = useState('XXXX') 
  const [loading , setLoading ] = useState(false)
  const { theme } = useThemeContext()

  const navigate = useNavigate()
  
  const { user , setUser} = useUserContext()

  const handleSubmit = async () =>{

     let verificationCode = user.udata.verificationCode

     let { name , email , password  , pic} = user.udata

     console.log(verificationCode);
     if(userCode == 'XXXX' || userCode == '' ){
       toast.error('Please enter the code ')
     }

     else if (userCode == verificationCode){
      try {
        setLoading(true)
        const { data } = await axios.post('/api/auth/signup', {name , email , password , pic })
        localStorage.setItem("userInfo", JSON.stringify(data))
        setUser(data)
        toast.success('Signup Success !')
        setLoading(false)
        navigate('/allposts')
      } catch (error) {
        setLoading(false)
         console.log(error);
      }
     }

     else if (userCode !== verificationCode){
      toast.error('Wrong code verify again ')
     }
  }
  return (
    <>

    {
      loading ? (<Loader/>) : (
        <div className={`h-screen  flex flex-col items-center justify-center ${theme === "dark" ? 'dark-theme' : ''}`}>
        <div className={`w-full md:w-1/2 lg:w-1/3 h-4/5 custom-shadow flex flex-col items-center justify-center mx-auto p-6  rounded-xl shadow-lg mt-12 ${theme === "dark" ? 'dark-theme' : 'bg-white'}`}>
        <h2 className={`text-4xl font-semibold text-center mb-4 ${theme === "dark" ? 'dark-theme' : ''}`}>Enter Your OTP</h2>
          <div className="mb-4">
            <input
              type="text"
              id="text"
              name="otp"
              className="text-black w-full p-2 border rounded-lg focus:ring focus:ring-indigo-400"
              placeholder="Enter your otp"
              required
              value={userCode}
              onChange={(e)=> setUserCode(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-[50%] bg-teal-500 text-white font-semibold p-2 rounded-lg hover:bg-teal-400 focus:ring focus:ring-teal-400"
            onClick={handleSubmit}
          >
            Verify
          </button>
      </div>
      </div>
      )
    }
      </>
  )
}

export default VerifyPage
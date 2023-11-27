import React from 'react'
import { useThemeContext } from "../../context/ThemeContext"
import { Link } from 'react-router-dom'

const Comment = ({ user ,pic , content , userId }) => {


     const { theme } = useThemeContext()
    return(
    <div className={`${theme === "dark" ? 'bg-gray-950 ' : ''} flex items-center justif-center mb-4  p-4 rounded-md shadow-md`}>
    <img src={`${pic === "" ? "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" : pic}`} alt={user} className="w-10 h-10 rounded-full mr-3" />
    <div>
    <Link to={`/profile/${userId}`} className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-indigo-800'}`}>
          {user}
    </Link>
      <p className={`text-gray-700 ${theme === "dark" ? 'text-white' : ''}`}>{content}</p>
    </div>
  </div>
    )
}
  

export default Comment

import React from 'react';
import '../../pages/Allposts/Allposts.css'
import { useThemeContext } from '../../context/ThemeContext';
import { Link } from "react-router-dom"
const BlogPost = ({ id , title, date, content, image }) => {
  const { theme } = useThemeContext();
  return (
    <div className={`${theme === 'dark' && 'dark-theme  ' } rounded-lg cursor-pointer custom-shadow-1 blog-post  transform hover:scale-105 transition-transform `}>
      <h2 className={`text-2xl font-bold mb-2  ${theme === 'dark' ? 'dark-theme' : 'text-teal-800' }`}>{title}</h2>
      {image && <img src={image} alt={title} className="blog-post-image" />}
      <p className={`text-gray-500 ${theme === 'dark' ? 'dark-theme' : 'text-teal-800' }`}>{date}</p>
      <p className={`${theme === 'dark' ?'dark-theme' : 'text-gray-700' }  my-4`}>{content}</p>
      <button className="p-3 rounded-md font-bold bg-teal-500 hover:bg-teal-400 text-white">
      <Link to={`/post/${id}`}>
        Read More
      </Link>
      </button>
    </div>
  );
};

export default BlogPost;

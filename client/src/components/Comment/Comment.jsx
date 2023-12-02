import React from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import './Comment.css';

const Comment = ({ user, pic, content, userId }) => {
  const { theme } = useThemeContext();

  return (
    <div className={`comment-container ${theme === 'dark' ? 'bg-gray-950' : ''} p-4 rounded-md shadow-md mb-4`}>
      <Link to={`/profile/${userId}`} className={`font-bold flex items-center  gap-3 ${theme === 'dark' ? 'text-white' : 'text-indigo-800'}`}>
        <img
          src={`${pic === '' ? 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' : pic}`}
          alt={user}
          className="rounded-full  comment-pic"
        />
        <span>{user}</span>
      </Link>

      <div className={`comment-text mt-3 flex items-center  text-center text-gray-700 ${theme === 'dark' ? 'text-white' : ''}`}>{content}</div>
    </div>
  );
};

export default Comment;

// FollowersListingItem.js

import React from 'react';
import { useThemeContext} from "../../context/ThemeContext"

const FollowersListingItem = ({ name, pic }) => {
  const { theme } = useThemeContext()
  return (
    <div className={`custom-shadow bg-white py-5 px-7  rounded-lg shadow-md flex  items-center justify-between  ${theme === "dark" ? "dark-theme ": ""}`}>
      <div className="flex gap-3  items-center justify-center">
      <img
        src={pic || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'}
        alt={name}
        className="w-12 h-12 object-cover rounded-full "
      />
      <h2 className="text-lg font-semibold">{name}</h2>
  </div>
      <div className="ml-3">
        <button className="bg-teal-600 text-white px-4 py-3 rounded-md font-bold hover:bg-teal-500">Remove</button>
      </div>
    
    </div>
  );
};

export default FollowersListingItem;

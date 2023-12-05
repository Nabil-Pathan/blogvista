// FollowersListingItem.js

import React from 'react';

const FollowersListingItem = ({ name, pic }) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow-md flex gap-3 items-center justify-center">
      <img
        src={pic || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'}
        alt={name}
        className="w-12 h-12 object-cover rounded-full "
      />
      <h2 className="text-lg font-semibold">{name}</h2>
    </div>
  );
};

export default FollowersListingItem;

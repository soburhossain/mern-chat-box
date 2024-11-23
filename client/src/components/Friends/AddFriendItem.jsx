import React, { useState } from "react";

export default function AddFriendItem({ user, onSendRequest }) {
  const [sentId, setSentId] = useState("");

  return (
    <>
      {sentId !== user._id && (
        <li className="flex justify-between items-center bg-white border border-gray-200 shadow-md p-4 rounded-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
          <span className="text-gray-900 font-medium">{user.username}</span>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
            onClick={(e) => {
              e.preventDefault();
              setSentId(user._id);
              onSendRequest(user._id);
            }}
          >
            Add Friend
          </button>
        </li>
      )}
    </>
  );
}

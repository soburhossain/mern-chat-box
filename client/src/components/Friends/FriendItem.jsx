import React from "react";

export default function FriendItem({ friend, onClick }) {
  return (
    <button
      className="w-full text-left bg-white border border-gray-200 shadow-md p-4 rounded-lg transform hover:scale-105 hover:bg-gray-100 transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      Start Texting with {friend.username}
    </button>
  );
}

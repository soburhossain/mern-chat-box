import React from "react";

export default function FreindRequestItem({ request, onAccept }) {
  return (
    <>
      <li className="flex justify-between items-center bg-white border border-gray-200 shadow-md p-4 rounded-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <span className="text-gray-900 font-medium">{request.username}</span>
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200 ease-in-out"
          onClick={() => onAccept(request._id)}
        >
          Accept
        </button>
      </li>
    </>
  );
}

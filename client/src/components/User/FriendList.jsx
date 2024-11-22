import React, { useContext } from "react";
import { userContext } from "./UserContext";

export default function FriendList() {
  const { user } = useContext(userContext);
  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Friends:</h3>
      <ul className="mt-4 space-y-3">
        {user.friends.length > 0 ? (
          user.friends.map((friend) => (
            <li
              key={friend._id}
              className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-xl py-2 px-4 text-lg hover:scale-105 hover:shadow-lg transition-all duration-200"
            >
              {friend.username}
            </li>
          ))
        ) : (
          <li className="text-gray-600 text-lg italic">
            No friends added yet.
          </li>
        )}
      </ul>
    </div>
  );
}

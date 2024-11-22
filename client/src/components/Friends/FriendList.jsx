import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { friendContext } from "./FriendContext";
import FriendItem from "./FriendItem.jsx";
export default function FriendList() {
  const { friends } = useContext(friendContext);
  const navigate = useNavigate();
  return (
    <div className="mb-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Your Friends
      </h2>
      {friends.length > 0 ? (
        <ul className="space-y-6">
          {friends.map((friend) => (
            <FriendItem
              key={friend._id}
              friend={friend}
              onClick={(e) => {
                e.preventDefault();
                navigate("/chat", { state: friend });
              }}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">You have no friends yet.</p>
      )}
    </div>
  );
}

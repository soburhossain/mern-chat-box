import React, { useContext } from "react";
import { friendContext } from "./FriendContext";
import AddFriendItem from "./AddFriendItem.jsx";
export default function AddFrirend() {
  const { allUsers, sendRequest } = useContext(friendContext);
  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Add New Friends
      </h2>
      {allUsers.length > 0 ? (
        <ul className="space-y-6">
          {allUsers.map((user) => (
            <AddFriendItem
              key={user._id}
              user={user}
              onSendRequest={sendRequest}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No users available to add as friends.</p>
      )}
    </div>
  );
}

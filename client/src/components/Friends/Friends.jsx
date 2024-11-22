import React, { useContext } from "react";
import Header from "./Header.jsx";
import FriendList from "./FriendList.jsx";
import AddFrirend from "./AddFrirend.jsx";
import Text from "./Text.jsx";
import FriendReq from "./FriendReq.jsx";
import { friendContext } from "./FriendContext.jsx";

const Friends = () => {
  const { message } = useContext(friendContext);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-gray-900 bg-opacity-90 shadow-2xl rounded-2xl p-6 sm:p-8 space-y-8">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Friend Requests */}
          <div className="lg:col-span-1 bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">
              Friend Requests
            </h2>
            <FriendReq />
          </div>

          {/* Friends List */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Friends List</h2>
            <FriendList />
          </div>
        </div>

        {/* Add Friends Section */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">Add Friends</h2>
          <AddFrirend />
        </div>

        {/* Message Section */}
        {message && (
          <div className="bg-indigo-900 rounded-lg p-6 shadow-lg">
            <Text />
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;

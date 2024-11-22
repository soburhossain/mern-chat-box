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
    <div className="min-h-screen bg-gradient-to-r from-indigo-800 via-purple-900 to-blue-700 p-8">
      <div className="max-w-5xl mx-auto bg-white bg-opacity-90 shadow-2xl rounded-2xl p-8">
        <Header />
        {/* Friend Requests */}
        <FriendReq />
        {/* Friends List */}
        <FriendList />

        {/* Add Friends Section */}
        <AddFrirend />

        {message && <Text />}
      </div>
    </div>
  );
};

export default Friends;

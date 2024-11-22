import React from "react";
import BackGroundImage from "./BackGroundImage";
import FriendList from "./FriendList";
import ExploreFriend from "./ExploreFriend";
import Header from "./Header.jsx";
const UserProfile = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-gray-800 to-blue-950">
      {/* Background with moving alien spacecrafts */}
      <BackGroundImage />
      {/* Semi-transparent overlay for better text contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="flex justify-center items-center w-full h-full z-10">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl space-y-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500 w-full max-w-4xl">
          {/* Heading */}
          <Header />
          {/* Friends List */}
          <FriendList />
          {/* Explore Friends Button */}
          <ExploreFriend />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

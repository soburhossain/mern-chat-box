import React from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const selectedFriend = location.state;
  console.log(selectedFriend);

  return (
    <header className="bg-opacity-70 bg-black text-white p-6 backdrop-blur-lg shadow-lg rounded-b-xl">
      <h3 className="text-3xl font-semibold tracking-tight hover:text-purple-200 transition-all duration-300 ease-out">
        Chat with {selectedFriend?.username}
      </h3>
    </header>
  );
}

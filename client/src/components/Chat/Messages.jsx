import React, { useContext } from "react";
import { chatContext } from "./ChatContext";
import { useLocation } from "react-router-dom";

export default function Messages() {
  const location = useLocation();
  const selectedFriend = location.state;
  const { messages } = useContext(chatContext);
  return (
    <div className="flex-grow overflow-auto p-6 space-y-6 bg-opacity-70 bg-black backdrop-blur-xl shadow-xl rounded-lg">
      {/* Render messages */}
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender._id === selectedFriend._id
              ? "justify-start"
              : "justify-end"
          } `}
        >
          <div
            className={`max-w-xl p-4 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 ${
              msg.sender._id === selectedFriend._id
                ? "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-gray-900"
                : "bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 text-white"
            }`}
          >
            <strong className="font-medium">
              {msg.sender._id === selectedFriend._id
                ? selectedFriend.username
                : "You"}
              :
            </strong>
            <p className="mt-2">{msg.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

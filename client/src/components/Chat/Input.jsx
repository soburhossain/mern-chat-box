import React, { useContext } from "react";
import { chatContext } from "./ChatContext";

export default function Input() {
  const { newMessage, setNewMessage } = useContext(chatContext);
  return (
    <input
      type="text"
      placeholder="Type a message..."
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      className="flex-grow p-4 text-lg bg-gray-800 text-white placeholder-gray-400 rounded-xl shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 ease-in-out"
    />
  );
}

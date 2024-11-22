import React, { useContext } from "react";
import { chatContext } from "./ChatContext";

export default function SendButton() {
  const { handleSend } = useContext(chatContext);

  return (
    <button
      onClick={handleSend}
      className="p-3 bg-gradient-to-r from-gray-600 to-blue-950 text-white rounded-xl shadow-lg hover:bg-gradient-to-l hover:scale-105 transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Send
    </button>
  );
}

import React, { useContext } from "react";
import { chatContext } from "./ChatContext";

export default function SendButton() {
  const { handleSend } = useContext(chatContext);
  return (
    <button
      onClick={handleSend}
      className="p-3  bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl shadow-2xl hover:bg-gradient-to-l hover:scale-105 transition-all duration-500 ease-in-out"
    >
      Send
    </button>
  );
}

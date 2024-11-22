import React from "react";
import Header from "./Header";
import Input from "./Input";
import SendButton from "./SendButton";
import Messages from "./Messages";
const Chat = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
      <Header />
      <Messages />
      <div className="p-6 bg-opacity-80 bg-black backdrop-blur-lg border-t border-gray-200 shadow-lg">
        <div className="flex items-center space-x-6">
          <Input />
          <SendButton />
        </div>
      </div>
    </div>
  );
};
export default Chat;

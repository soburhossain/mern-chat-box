import React from "react";
import Header from "./Header";
import Input from "./Input";
import SendButton from "./SendButton";
import Messages from "./Messages";
const Chat = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Header */}
      <Header />
      {/* Messages Section */}
      <Messages />

      {/* Input Section */}
      <div className="p-4 bg-opacity-80 bg-gray-900 backdrop-blur-lg border-t border-gray-700 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
          <Input className="flex-grow w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <SendButton className="w-full sm:w-auto bg-indigo-600 text-white rounded-lg p-3 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>
    </div>
  );
};

export default Chat;

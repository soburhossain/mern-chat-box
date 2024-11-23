import React from "react";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-blue-900 via-black to-indigo-900 overflow-hidden">
      {/* Background moving particles */}
      <div className="absolute inset-0">
        {/* Alien-like glowing orbs */}
        <div className="absolute top-1/4 left-1/3 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-green-500 blur-md opacity-70 animate-[alienMove_7s_infinite_ease-in-out]" />
        <div className="absolute bottom-1/4 right-1/3 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-blue-500 blur-md opacity-50 animate-[alienMove_7s_infinite_ease-in-out]" />
        <div className="absolute top-1/2 left-1/2 w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-purple-500 blur-md opacity-50 animate-[alienMove_7s_infinite_ease-in-out]" />
        <div className="absolute top-1/3 left-1/4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-red-500 blur-md opacity-60 animate-[alienMove_7s_infinite_ease-in-out]" />
        {/* Subtle glowing lights */}
        <div className="absolute top-1/2 right-1/4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-indigo-500 rounded-full blur-md opacity-60 animate-glowing" />
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-pink-500 rounded-full blur-md opacity-50 animate-glowing" />
      </div>

      {/* Foreground Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 sm:space-y-6 z-10 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 animate-fadeIn text-center">
          Welcome to Chat-Box
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center max-w-lg sm:max-w-xl md:max-w-3xl">
          Connect with your friends and experience a futuristic world of
          seamless communication. Dive into the chat revolution!
        </p>
        {token && (
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/profile");
            }}
            className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg md:text-xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all animate-bounce"
          >
            Go To Chat-App
          </button>
        )}
        {!token && (
          <p>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
              className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg md:text-xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all animate-bounce"
            >
              Login First
            </button>
          </p>
        )}
      </div>

      {/* Subtle Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
    </div>
  );
};

export default HomePage;

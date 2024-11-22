import React from "react";
import Form from "./Form.jsx";
import BackGroundImage from "./BackGroundImage.jsx";

const Login = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-gray-700 to-blue-950">
      <BackGroundImage />
      {/* Semi-transparent overlay for better text contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      {/* Form Section */}
      <div className="flex justify-center items-center w-full h-full z-10">
        <Form />
      </div>
    </div>
  );
};

export default Login;

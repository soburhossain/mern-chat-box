import React from "react";

import Form from "./Form";
import BackGroundImage from "./BackGroundImage";

const Register = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-purple-600 to-blue-500">
      {/* Background with moving alien spacecrafts */}
      <BackGroundImage />
      {/* Semi-transparent overlay for better text contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="flex justify-center items-center w-full h-full z-10">
        <Form />
      </div>
    </div>
  );
};

export default Register;

import React, { useContext } from "react";
import { registerContext } from "./RegisterContext";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();
  const { formData, setFormData, message, handleSubmit, isLoading } =
    useContext(registerContext);
  return (
    <form
      className="bg-gray-800 p-8 rounded-lg shadow-xl space-y-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500"
      onSubmit={handleSubmit}
    >
      {/* Heading */}
      <h2 className="text-4xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700">
        Welcome to the ChatBox! 💬
      </h2>

      {/* Form Inputs */}
      <input
        type="text"
        placeholder="Username"
        className="w-full p-4 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 ease-in-out transform hover:scale-105"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-4 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 ease-in-out transform hover:scale-105"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-4 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 ease-in-out transform hover:scale-105"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      {isLoading && <p className="text-center">Please wait...</p>}
      {message && (
        <p className="text-center text-xl font-semibold text-red-600 mt-4 opacity-80 transition-opacity duration-500 ">
          {message}
        </p>
      )}
      <button
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold rounded-lg hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 transition duration-300 ease-in-out transform hover:scale-110"
        type="submit"
      >
        Register
      </button>
      {/* Sign Up Section */}
      <div className="text-center mt-4">
        <p className="text-white">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 font-semibold underline transition duration-300"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Login
          </button>
        </p>
      </div>
    </form>
  );
}

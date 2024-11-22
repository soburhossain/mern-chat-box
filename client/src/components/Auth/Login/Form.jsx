import React, { useContext } from "react";
import { loginContext } from "./LoginContext";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();
  const { handleSubmit, formData, setFormData, message, isLoading } =
    useContext(loginContext);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg space-y-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500 w-full sm:w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl text-center font-extrabold text-white">
          Login
        </h2>

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
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        {isLoading && (
          <p className="text-center text-gray-500 font-semibold">
            Please wait...
          </p>
        )}
        {message && (
          <p className="text-center text-xl font-semibold text-red-600 mt-4 opacity-80 transition-opacity duration-500">
            {message}
          </p>
        )}

        <button
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold rounded-lg hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 transition duration-300 ease-in-out transform hover:scale-110"
          type="submit"
        >
          Login
        </button>

        {/* Sign Up Section */}
        <div className="text-center mt-4">
          <p className="text-white">
            Don’t have an account?{" "}
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 font-semibold underline transition duration-300"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

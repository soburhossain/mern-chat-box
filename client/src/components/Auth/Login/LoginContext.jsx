import { createContext, useState } from "react";
import API from "../../../services/api";
import { useNavigate } from "react-router-dom";
const loginContext = createContext();
const LoginProvider = ({ children }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [token, setToken] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await API.post("/login", formData);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");

      setMessage("Login successful!");
    } catch (err) {
      setMessage(err.response?.data?.error || "Error logging in.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <loginContext.Provider
      value={{
        handleSubmit,
        formData,
        setFormData,
        message,
        setMessage,
        token,
        setToken,
        isLoading,
      }}
    >
      {children}
    </loginContext.Provider>
  );
};

export { loginContext, LoginProvider };

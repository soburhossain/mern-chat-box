import { createContext, useState } from "react";
import API from "../../../services/api";
import { useNavigate } from "react-router-dom";
const registerContext = createContext();
const RegisterProvider = ({ children }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/register", formData);
      setMessage(res.data.message);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.error || "Error registering user.");
    }
  };
  return (
    <registerContext.Provider
      value={{
        formData,
        setFormData,
        message,
        setMessage,
        handleSubmit,
      }}
    >
      {children}
    </registerContext.Provider>
  );
};
export { registerContext, RegisterProvider };

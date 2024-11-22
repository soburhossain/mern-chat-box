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
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await API.post("/register", formData);
      setMessage(res.data.message);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.error || "Error registering user.");
    } finally {
      setIsLoading(false);
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
        isLoading,
      }}
    >
      {children}
    </registerContext.Provider>
  );
};
export { registerContext, RegisterProvider };

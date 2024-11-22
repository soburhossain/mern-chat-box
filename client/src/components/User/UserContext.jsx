import { createContext, useEffect, useState } from "react";
import API from "../../services/api";

const userContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/me");
        setUser(res.data);
      } catch (err) {
        setError("Error fetching user info. Please try again later.");
        console.error("Error fetching user info:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading)
    return <p className="text-center text-xl text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-xl text-red-600">{error}</p>;
  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export { userContext, UserProvider };

import { createContext, useCallback, useEffect, useState } from "react";
import API from "../../services/api";
const friendContext = createContext();
const FriendProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [message, setMessage] = useState("");

  const fetchFriendsData = useCallback(async () => {
    try {
      const { data } = await API.get("/me");
      setFriends(data.friends);
      setRequests(data.friendRequests);
    } catch (err) {
      console.error("Error fetching friends data:", err);
    }
  }, []);

  const fetchAllUsers = useCallback(async () => {
    try {
      const { data } = await API.get("/users");
      const nonFriendUsers = data.filter(
        (user) => !friends.some((friend) => friend._id === user._id)
      );
      setAllUsers(nonFriendUsers);
    } catch (err) {
      console.error("Error fetching all users:", err);
    }
  }, [friends]);

  useEffect(() => {
    fetchFriendsData();
    fetchAllUsers();
  }, [fetchFriendsData, fetchAllUsers]);

  const sendRequest = async (userId) => {
    try {
      const { data } = await API.post("/send-friend-request", {
        friendId: userId,
      });
      setMessage(data.message);
    } catch (err) {
      console.error("Error sending friend request:", err);
    }
  };

  const acceptRequest = async (userId) => {
    try {
      const { data } = await API.post("/accept-friend-request", {
        friendId: userId,
      });
      setMessage(data.message);
    } catch (err) {
      console.error("Error accepting friend request:", err);
    }
  };

  return (
    <friendContext.Provider
      value={{
        friends,
        setFriends,
        requests,
        setRequests,
        allUsers,
        setAllUsers,
        message,
        setMessage,
        fetchFriendsData,
        fetchAllUsers,
        sendRequest,
        acceptRequest,
      }}
    >
      {children}
    </friendContext.Provider>
  );
};

export { friendContext, FriendProvider };

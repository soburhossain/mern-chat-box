import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import API from "../../services/api";

const chatContext = createContext();

const ChatProvider = ({ children }) => {
  const location = useLocation();
  const selectedFriend = location.state;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  // Establish socket connection and join room
  useEffect(() => {
    if (!socket) {
      const newSocket = io("https://chat-app-backend-1-u5q1.onrender.com/api"); // Backend URL
      const token = localStorage.getItem("token");
      newSocket.emit("join", token);

      // Join room for the selected friend
      if (selectedFriend) {
        newSocket.emit("joinRoom", selectedFriend._id);
      }

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [socket, selectedFriend]);

  // Fetch messages when the friend is selected
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await API.get(`/messages/${selectedFriend._id}`);
        setMessages(response.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    if (selectedFriend) fetchMessages();
  }, [selectedFriend]);

  // Listen for new messages from socket
  useEffect(() => {
    if (socket) {
      const handleMessage = (message) => {
        console.log("Message received from socket:", message); // Debugging log
        setMessages((prev) => [...prev, message]);
      };

      socket.on("receiveMessage", handleMessage);

      return () => {
        socket.off("receiveMessage", handleMessage);
      };
    }
  }, [socket]);

  // Send a new message
  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const message = { receiverId: selectedFriend._id, content: newMessage };

    try {
      const response = await API.post("/messages", message);
      socket.emit("sendMessage", response.data);
      setMessages((prev) => [...prev, response.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <chatContext.Provider
      value={{
        messages,
        setMessages,
        newMessage,
        setNewMessage,
        socket,
        setSocket,
        handleSend,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export { chatContext, ChatProvider };

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register/Register.jsx";
import Login from "./components/Auth/Login/Login.jsx";
import UserProfile from "./components/User/UserProfile.jsx";
import Friends from "./components/Friends/Friends.jsx";
import Chat from "./components/Chat/Chat.jsx";
import { LoginProvider } from "./components/Auth/Login/LoginContext.jsx";
import { RegisterProvider } from "./components/Auth/Register/RegisterContext.jsx";
import { ChatProvider } from "./components/Chat/ChatContext.jsx";
import { UserProvider } from "./components/User/UserContext.jsx";
import { FriendProvider } from "./components/Friends/FriendContext.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RegisterProvider>
              <Register />
            </RegisterProvider>
          }
        />
        <Route
          path="/register"
          element={
            <RegisterProvider>
              <Register />
            </RegisterProvider>
          }
        />
        <Route
          path="/login"
          element={
            <LoginProvider>
              <Login />
            </LoginProvider>
          }
        />
        <Route
          path="/profile"
          element={
            <UserProvider>
              <UserProfile />
            </UserProvider>
          }
        />
        <Route
          path="/friends"
          element={
            <FriendProvider>
              <Friends />
            </FriendProvider>
          }
        />
        <Route
          path="/chat"
          element={
            <ChatProvider>
              <Chat />
            </ChatProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

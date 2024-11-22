import React, { useContext } from "react";
import { userContext } from "./UserContext";

export default function Header() {
  const { user } = useContext(userContext);
  return (
    <h2 className="text-4xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700">
      Welcome, {user.username}!
    </h2>
  );
}

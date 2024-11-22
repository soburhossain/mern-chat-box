import React, { useContext } from "react";
import { userContext } from "./UserContext";

export default function Header() {
  const { user } = useContext(userContext);
  return (
    <h2 className="text-4xl text-center font-extrabold  text-white ">
      Welcome, {user.username}!
    </h2>
  );
}

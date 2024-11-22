import React, { useContext } from "react";
import { friendContext } from "./FriendContext";

export default function Text() {
  const { message } = useContext(friendContext);
  return (
    <p className="mt-8 text-center text-green-700 font-medium text-xl">
      {message}
    </p>
  );
}

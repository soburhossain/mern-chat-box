import React, { useContext } from "react";
import { friendContext } from "./FriendContext";
import FreindRequestItem from "./FreindRequestItem.jsx";
import ReqHeading from "./ReqHeading.jsx";
export default function FriendReq() {
  const { requests, acceptRequest } = useContext(friendContext);

  return (
    <div className="mb-10">
      <ReqHeading />
      {requests.length ? (
        <ul className="space-y-6">
          {requests.map((req) => (
            <FreindRequestItem
              key={req._id}
              request={req}
              onAccept={acceptRequest}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No friend requests at the moment.</p>
      )}
    </div>
  );
}

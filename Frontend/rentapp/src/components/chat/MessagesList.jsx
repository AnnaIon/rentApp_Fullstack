// components/Chat/MessageList.jsx
import React, { useEffect, useRef } from "react";

const MessageList = ({ messages, currentUserId }) => {
  const scrollRef = useRef();

  // Automatically scrolls to the bottom of the message list whenever new messages are received

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-80 overflow-y-auto bg-white/20 p-4 rounded-lg mb-4">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`mb-2 p-2 rounded-md max-w-xs ${
            msg.sender === currentUserId
              ? "ml-auto bg-blue-500 text-white"
              : "mr-auto bg-gray-200 text-black"
          }`}
        >
          {msg.content}
          <div className="text-xs mt-1 text-right opacity-70">
            {new Date(msg.createdAt).toLocaleTimeString()}
          </div>
        </div>
      ))}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default MessageList;

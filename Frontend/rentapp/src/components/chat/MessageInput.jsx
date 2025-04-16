// components/Chat/MessageInput.jsx
import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [content, setContent] = useState("");

// It handles input state, submission, and clears the input after sending.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSend(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-2 rounded-md border border-white/40 bg-white/80 text-black"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-700"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;

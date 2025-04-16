import React, { useEffect, useState } from "react";
import MessageList from "./MessagesList";
import MessageInput from "./MessageInput";
import api from "../../services/axios";
import { useAuth } from "../../context/AuthContext";

const MessagesPage = ({ selectedUser }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(()=>{
    const fetchMessages = async () => {
        if (!selectedUser) return;
        try {
          const res = await api.get(`/messages/${selectedUser._id}`);
          setMessages(res.data.data);
        } catch (err) {
          console.error("Error fetching messages:", err);
        }
      };
      fetchMessages();
  },[selectedUser, refresh])
  
  const handleSendMessage = async (content) => {
    try {
      await api.post("/messages/sendMessage", {
        receiver: selectedUser._id,
        content,
      });
      setRefresh((prev) => !prev); 
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };
  
  return (
    <div className="bg-white/10 p-4 rounded-xl shadow-xl w-full max-w-lg mx-auto">

      <MessageList messages={messages} currentUserId={user._id} />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default MessagesPage;

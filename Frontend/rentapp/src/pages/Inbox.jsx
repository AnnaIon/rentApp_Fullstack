import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import MessagesPage from "../components/Chat/MessagesPage";
import api from "../services/axios";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const Inbox = () => {
  const { user } = useAuth(); // Get the current logged-in user
  const [users, setUsers] = useState([]); // List of other users to chat with
  const [selectedUser, setSelectedUser] = useState(null); // The user selected for messaging
  const location = useLocation(); // Access route location state (e.g., for redirects)

  // Fetch all users except the current user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!user) return;
        const res = await api.get("/users");
        const filtered = res.data.users.filter((u) => u._id !== user._id);
        setUsers(filtered);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [user]);

  // If a user is passed via navigation state, auto-select them
  useEffect(() => {
    if (location.state?.userId && users.length > 0) {
      const foundUser = users.find((u) => u._id === location.state.userId);
      if (foundUser) setSelectedUser(foundUser);
    }
  }, [location.state, users]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-200 pb-30">
      {/* Navigation bar */}
      <Navbar />

      {/* Layout for user list and chat window */}
      <div className="flex flex-col md:flex-row gap-6 p-6">
        
        {/* Left panel: list of users */}
        <div className="w-full md:w-1/4 bg-white rounded-2xl p-4 shadow-2xl">
          <h2 className="text-xl text-orange-700 font-semibold mb-4">Users</h2>
          {users.length === 0 ? (
            <p className="text-orange-600">No users available</p>
          ) : (
            users.map((u) => (
              <button
                key={u._id}
                onClick={() => setSelectedUser(u)} // Select user for chat
                className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 shadow ${
                  selectedUser?._id === u._id
                    ? "bg-orange-200 shadow-inner text-orange-800"
                    : "hover:bg-orange-100 text-orange-800"
                }`}
              >
                {u.firstName} {u.lastName}
              </button>
            ))
          )}
        </div>

        {/* Right panel: messages view */}
        <div className="w-full md:flex-1">
          {selectedUser ? (
            <MessagesPage selectedUser={selectedUser} />
          ) : (
            <div className="text-orange-700 text-lg mt-8 md:mt-0 text-center">
              Select a user to start chatting.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;

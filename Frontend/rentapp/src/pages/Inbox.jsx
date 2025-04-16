import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import MessagesPage from "../components/Chat/MessagesPage";
import api from "../services/axios";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const Inbox = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const location = useLocation();

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

  useEffect(() => {
    if (location.state?.userId && users.length > 0) {
      const foundUser = users.find((u) => u._id === location.state.userId);
      if (foundUser) setSelectedUser(foundUser);
    }
  }, [location.state, users]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-200 pb-30">
      <Navbar />
      <div className="flex flex-col md:flex-row gap-6 p-6">
        <div className="w-full md:w-1/4 bg-white rounded-2xl p-4 shadow-2xl">
          <h2 className="text-xl text-orange-700 font-semibold mb-4">Users</h2>
          {users.length === 0 ? (
            <p className="text-orange-600">No users available</p>
          ) : (
            users.map((u) => (
              <button
                key={u._id}
                onClick={() => setSelectedUser(u)}
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

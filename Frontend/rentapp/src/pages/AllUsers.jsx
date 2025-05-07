import { useEffect, useState } from "react";
import api from "../services/axios";
import UserCard from "../components/UserCard";
import { useAuth } from "../context/AuthContext"; 
import Navbar from "../components/NavBar";

const AllUsers = () => {
  const { user: currentUser } = useAuth(); // Get the current authenticated user
  const [users, setUsers] = useState([]); // Holds the list of all users
  const [loading, setLoading] = useState(true); // Tracks loading state

  // Fetches all users from the backend
  const fetchAllUsers = async () => {
    try {
      const response = await api.get("/users");
      console.log("Fetched users:", response.data.users);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false); // Loading complete
    }
  };

  // Run once on component mount
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Restrict access to admins only
  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="text-center mt-20 text-lg font-medium text-red-600">
        You do not have access to this page.
      </div>
    );
  }

  // Show loading message while data is being fetched
  if (loading) {
    return (
      <div className="text-center mt-20 text-lg font-medium text-gray-600">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100">
      {/* Top navbar */}
      <Navbar />

      {/* Page title */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 mt-3">
          All Users
        </h1>

        {/* Grid layout for user cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;

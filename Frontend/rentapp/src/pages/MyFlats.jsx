import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import UserFlats from "../components/userFlats";
import AddFlat from "../components/AddFlat";
import api from "../services/axios";

const MyFlats = () => {
  // State to store the user's flats
  const [flats, setFlats] = useState([]);
  // State to control whether the AddFlat modal is visible
  const [showAddFlat, setShowAddFlat] = useState(false);

  // Fetch user's flats on component mount
  useEffect(() => {
    const fetchUserFlats = async () => {
      try {
        const response = await api.get("/userApartments"); // GET request to fetch user's apartments
        setFlats(response.data.data); // Set fetched flats into state
      } catch (err) {
        console.error("Error fetching user flats:", err);
      }
    };

    fetchUserFlats();
  }, []);

  // Handle a new flat being added successfully
  const handleFlatAdded = (newFlat) => {
    setFlats((prev) => [newFlat, ...prev]); // Add new flat to the top of the list
    setShowAddFlat(false); // Close modal after adding
  };

  // Handle editing a flat
  const handleEdit = async (updatedFlat) => {
    try {
      const response = await api.patch(`/updateApartment/${updatedFlat._id}`, updatedFlat); // PATCH request to update apartment
      setFlats((prev) =>
        prev.map((flat) =>
          flat._id === updatedFlat._id ? response.data.data : flat
        )
      );
    } catch (err) {
      console.error("Error updating apartment:", err);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content section, blurred if AddFlat modal is open */}
      <div className={`p-6 transition-all duration-300 ${showAddFlat ? "blur-sm" : ""}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-orange-700">My Flats</h1>
          {/* Button to toggle AddFlat modal */}
          <button
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            onClick={() => setShowAddFlat(true)}
          >
            Add Flat
          </button>
        </div>

        {/* List of user's flats */}
        <UserFlats flats={flats} setFlats={setFlats} onEdit={handleEdit} />
      </div>

      {/* Modal for adding a flat */}
      {showAddFlat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            {/* Close button for modal */}
            <button
              onClick={() => setShowAddFlat(false)}
              className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
            {/* AddFlat component inside modal */}
            <AddFlat onFlatAdded={handleFlatAdded} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFlats;

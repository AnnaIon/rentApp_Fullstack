import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import UserFlats from "../components/userFlats";
import AddFlat from "../components/AddFlat";
import api from "../services/axios";

const MyFlats = () => {
  const [flats, setFlats] = useState([]);
  const [showAddFlat, setShowAddFlat] = useState(false);

  useEffect(() => {
    const fetchUserFlats = async () => {
      try {
        const response = await api.get("/userApartments");
        setFlats(response.data.data);
      } catch (err) {
        console.error("Error fetching user flats:", err);
      }
    };

    fetchUserFlats();
  }, []);

  const handleFlatAdded = (newFlat) => {
    setFlats((prev) => [newFlat, ...prev]);
    setShowAddFlat(false);
  };

  const handleEdit = async (updatedFlat) => {
    try {
      const response = await api.patch(`/updateApartment/${updatedFlat._id}`, updatedFlat);
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
      <Navbar />
      <div className={`p-6 transition-all duration-300 ${showAddFlat ? "blur-sm" : ""}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-orange-700">My Flats</h1>
          <button
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            onClick={() => setShowAddFlat(true)}
          >
            Add Flat
          </button>
        </div>
        <UserFlats flats={flats} setFlats={setFlats} onEdit={handleEdit} />
        </div>

     
      {showAddFlat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowAddFlat(false)}
              className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
            <AddFlat onFlatAdded={handleFlatAdded} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFlats;

import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import FlatCard from "../components/FlatCard";
import api from "../services/axios";
import { useAuth } from "../context/AuthContext";

const Favourites = () => {
  const [favorites, setFavorites] = useState([]); // Stores the list of favorited apartments
  const { user } = useAuth(); // Get the current authenticated user

  // Fetch the user's favorite apartments from the backend
  const fetchFavorites = async () => {
    try {
      const response = await api.get("/favorites");
      setFavorites(response.data.data);
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
    }
  };

  // Run fetchFavorites once on component mount
  useEffect(() => {
    fetchFavorites();
  }, []);

  // Toggle favorite status for an apartment
  const toggleFavorite = async (id) => {
    try {
      const response = await api.patch(`/apartment/favorite/${id}`);
      const updatedApartment = response.data.data;

      // Update local state to reflect the new favorite status
      setFavorites((prev) =>
        prev.map((apt) =>
          apt._id === id
            ? { ...apt, favoritedBy: updatedApartment.favoritedBy }
            : apt
        )
      );
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  return (
    <div>
      {/* Navigation bar at the top */}
      <Navbar />

      {/* Grid layout for favorite apartments */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.length === 0 ? (
          // If there are no favorites, display a message
          <p className="text-gray-500">No favorite apartments found.</p>
        ) : (
          // Render a FlatCard for each favorite apartment
          favorites.map((apt) => (
            <FlatCard
              key={apt._id}
              flat={apt}
              onToggleFavorite={toggleFavorite}
              showFavorite={true}
              showEdit={false}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Favourites;

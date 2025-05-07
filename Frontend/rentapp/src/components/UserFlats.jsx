import React from "react";
import FlatCard from "./FlatCard"; // Reusable card component for displaying apartment details
import api from "../services/axios"; // Axios instance for making HTTP requests
import { successToast, errorToast } from "../toastify/toastify"; // Toast notifications

/**
 * UserFlats Component
 * Renders a list of the current user's flats with edit and delete options.
 *
 * @param {Array} flats - Array of apartment objects owned by the user
 * @param {Function} setFlats - Function to update the flats state
 * @param {Function} onEdit - Callback for editing a flat
 */
const UserFlats = ({ flats, setFlats, onEdit }) => {
  
  // Handle deleting a flat by its ID
  const handleDeleteFlat = async (id) => {
    try {
      await api.delete(`/deleteApartment/${id}`); // Send DELETE request
      setFlats((prev) => prev.filter((flat) => flat._id !== id)); // Remove from local state
      successToast("Apartment deleted."); // Show success message
    } catch (err) {
      errorToast("Failed to delete."); // Show error message
      console.error(err); // Log error for debugging
    }
  };

  return (
    <div className="p-6">
      {/* Grid layout to display user's flats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {flats.map((flat) => (
          <FlatCard
            key={flat._id}
            flat={flat}
            onEdit={onEdit} // Pass edit handler
            onToggleFavorite={() => {}} // No favorite toggle here
            onDelete={handleDeleteFlat} // Pass delete handler
            showEdit={true}
            showFavorite={false}
            showDelete={true}
          />
        ))}
      </div>
    </div>
  );
};

export default UserFlats;

import React from "react";
import FlatCard from "./FlatCard";
import api from "../services/axios";
import { successToast, errorToast } from "../toastify/toastify";

const UserFlats = ({ flats, setFlats, onEdit }) => {

  const handleDeleteFlat = async (id) => {
    try {
      await api.delete(`/deleteApartment/${id}`);
      setFlats((prev) => prev.filter((flat) => flat._id !== id));
      successToast("Apartment deleted.");
    } catch (err) {
      errorToast("Failed to delete.");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {flats.map((flat) => (
          <FlatCard
            key={flat._id}
            flat={flat}
            onEdit={onEdit}
            onToggleFavorite={() => {}}
            onDelete={handleDeleteFlat}
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

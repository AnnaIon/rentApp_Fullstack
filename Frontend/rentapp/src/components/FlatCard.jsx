import React, { useState } from "react";
import {
  HeartIcon as HeartSolid,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import FlatCardEdit from "./FlatCardEdit";

/**
 * FlatCard Component
 * Displays apartment information with optional edit/delete/favorite actions
 */
const FlatCard = ({
  flat,
  onToggleFavorite,
  onEdit,
  onDelete,
  showFavorite,
  showEdit,
  showDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Save edited data
  const handleSave = (updatedFlat) => {
    onEdit && onEdit(updatedFlat);
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Navigate to Inbox with selected user for messaging
  const handleMessageOwner = () => {
    navigate("/inbox", { state: { userId: flat.createdBy?._id } });
  };

  // Check if the logged-in user is the owner
  const isOwner = user?._id === flat.createdBy?._id;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 relative text-center">
      
      {/* Favorite button (if enabled) */}
      {showFavorite && (
        <button
          onClick={() => onToggleFavorite(flat._id)}
          className="absolute top-4 right-4"
          title={flat.favoritedBy?.includes(user?._id) ? "Unfavorite" : "Favorite"}
        >
          {flat.favoritedBy?.includes(user?._id) ? (
            <HeartSolid className="w-6 h-6 text-red-500 hover:scale-110 transition" />
          ) : (
            <HeartOutline className="w-6 h-6 text-gray-400 hover:text-red-500 hover:scale-110 transition" />
          )}
        </button>
      )}

      {/* Edit button (if allowed and not editing) */}
      {showEdit && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute bottom-4 right-4"
          title="Edit Apartment"
        >
          <PencilSquareIcon className="w-5 h-5 text-blue-500 hover:scale-110 transition" />
        </button>
      )}

      {/* Delete button (if allowed) */}
      {showDelete && (
        <button
          onClick={() => onDelete(flat._id)}
          className="absolute bottom-4 left-4"
          title="Delete Apartment"
        >
          <TrashIcon className="w-5 h-5 text-red-500 hover:scale-110 transition" />
        </button>
      )}

      {/* Render editable form or display flat info */}
      {isEditing ? (
        <FlatCardEdit flat={flat} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
          <h2
            className="text-xl font-bold mb-2"
            style={{ color: "oklch(83.7% 0.128 66.29)" }}
          >
            {flat.title}
          </h2>
          <p className="text-sm text-gray-500">City: {flat.city}</p>
          <p className="text-sm text-gray-500">Street: {flat.streetName}</p>
          <p className="text-base font-medium text-gray-700 mt-2">
            {flat.price} $ · {flat.areaSize} m²
          </p>
          <p className="text-sm text-gray-500">
            AC: {flat.hasAC ? "Yes" : "No"}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Built: {new Date(flat.yearBuild).toLocaleDateString()}
          </p>

          {/* Message button only visible if current user is not the owner */}
          {flat.createdBy && !isOwner && (
            <button
              onClick={handleMessageOwner}
              className="mt-4 bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-orange-600 transition"
            >
              Message Owner
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default FlatCard;

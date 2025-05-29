import React from "react";

// Reusable card component for displaying user information (used in admin dashboard)
const UserCard = ({ user }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 text-center hover:shadow-lg transition duration-300">
      {/* User's name */}
      <h2 className="text-xl font-bold mb-2 text-orange-600">{user.name}</h2>

      {/* User's email */}
      <p className="text-sm text-gray-600 mb-1">{user.email}</p>

      {/* User's role (e.g., admin, user) */}
      <p className="text-sm text-gray-700 mb-1">
        <span className="font-semibold">Role:</span> {user.role}
      </p>

      {/* Number of apartments listed by the user */}
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Flats:</span> {user.apartments?.length -1 <0 ? 0: user.apartments?.length -1 }
      </p>
    </div>
  );
};

export default UserCard;

import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 text-center hover:shadow-lg transition duration-300">
      <h2 className="text-xl font-bold mb-2 text-orange-600">{user.name}</h2>
      <p className="text-sm text-gray-600 mb-1">{user.email}</p>
      <p className="text-sm text-gray-700 mb-1">
        <span className="font-semibold">Role:</span> {user.role}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Flats:</span> {user.apartments?.length || 0}
      </p>
    </div>
  );
};

export default UserCard;

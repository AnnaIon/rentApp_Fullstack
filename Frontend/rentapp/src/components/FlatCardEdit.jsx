import React, { useState } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

// FlatCardEdit: A component to edit apartment/flat details inline
const FlatCardEdit = ({ flat, onCancel, onSave }) => {
  // Local state to hold editable flat data
  const [editData, setEditData] = useState({ ...flat });

  // Handle input changes for all fields
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setEditData({
      ...editData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  // Pass updated flat data to parent component
  const handleSave = () => {
    onSave(editData);
  };

  return (
    <div>
      {/* Title field */}
      <input
        id="title"
        value={editData.title}
        onChange={handleChange}
        className="text-lg font-semibold w-full border rounded px-2 py-1 mb-1"
      />

      {/* City field */}
      <input
        id="city"
        value={editData.city}
        onChange={handleChange}
        className="text-sm w-full border rounded px-2 py-1 mb-1"
      />

      {/* Street name field */}
      <input
        id="streetName"
        value={editData.streetName}
        onChange={handleChange}
        className="text-sm w-full border rounded px-2 py-1 mb-1"
      />

      {/* Rent price field */}
      <input
        id="price"
        type="number"
        value={editData.price}
        onChange={handleChange}
        className="text-sm w-full border rounded px-2 py-1 mb-1"
      />

      {/* Area size field */}
      <input
        id="areaSize"
        type="number"
        value={editData.areaSize}
        onChange={handleChange}
        className="text-sm w-full border rounded px-2 py-1 mb-1"
      />

      {/* Checkbox for AC availability */}
      <label className="text-sm flex items-center gap-2 mt-1">
        <input
          id="hasAC"
          type="checkbox"
          checked={editData.hasAC}
          onChange={handleChange}
        />
        Has AC
      </label>

      {/* Date input for year built */}
      <label className="text-sm flex items-center gap-2 mt-1">
        <input
          id="yearBuild"
          type="date"
          value={editData.yearBuild?.split("T")[0]} // Normalize format
          onChange={handleChange}
          className="text-sm w-full border rounded px-2 py-1 mb-1"
        />
      </label>

      {/* Action buttons */}
      <div className="flex justify-end gap-2 mt-3">
        <button title="Save" onClick={handleSave}>
          <CheckIcon className="w-5 h-5 text-green-600 hover:scale-110" />
        </button>
        <button title="Cancel" onClick={onCancel}>
          <XMarkIcon className="w-5 h-5 text-red-500 hover:scale-110" />
        </button>
      </div>
    </div>
  );
};

export default FlatCardEdit;

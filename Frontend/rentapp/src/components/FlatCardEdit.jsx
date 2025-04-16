import React, { useState } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const FlatCardEdit = ({ flat, onCancel, onSave }) => {
  const [editData, setEditData] = useState({ ...flat });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setEditData({
      ...editData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    onSave(editData);
  };

  return (
    <div>
      <input
        id="title"
        value={editData.title}
        onChange={handleChange}
        className="text-lg font-semibold w-full border rounded px-2 py-1 mb-1"
      />
      <input
        id="city"
        value={editData.city}
        onChange={handleChange}
        className="text-sm w-full border rounded px-2 py-1 mb-1"
      />
      <input
        id="streetName"
        value={editData.streetName}
        onChange={handleChange}
        className="text-sm w-full border rounded px-2 py-1 mb-1"
      />
      <input
        id="price"
        type="number"
        value={editData.price}
        onChange={handleChange}
        className="text-sm w-full border rounded px-2 py-1 mb-1"
      />
      <input
        id="areaSize"
        type="number"
        value={editData.areaSize}
        onChange={handleChange}
        className="text-sm w-full border rounded px-2 py-1 mb-1"
      />
      <label className="text-sm flex items-center gap-2 mt-1">
        <input
          id="hasAC"
          type="checkbox"
          checked={editData.hasAC}
          onChange={handleChange}
        />
        Has AC
      </label>
      <label className="text-sm flex items-center gap-2 mt-1">
        <input
          id="yearBuild"
          type="date"
          value={editData.yearBuild?.split("T")[0]} 
          onChange={handleChange}
          className="text-sm w-full border rounded px-2 py-1 mb-1"
        />
      </label>

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

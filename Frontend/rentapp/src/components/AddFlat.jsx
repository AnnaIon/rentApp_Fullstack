import React, { useState } from "react";
import api from "../services/axios";
import { successToast, errorToast } from "../toastify/toastify";

/**
 * AddFlat component allows users to submit a form
 * for adding a new apartment listing to the system.
 */
const AddFlat = ({ onFlatAdded }) => {
  // Local state for form inputs
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    streetName: "",
    price: "",
    areaSize: "",
    yearBuild: "",
    hasAC: false,
  });

  // Handle changes to form inputs
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend
      const res = await api.post("/addApartment", formData);
      successToast("Flat added successfully!");

      // Notify parent component to update UI
      onFlatAdded(res.data.data);

      // Reset form
      setFormData({
        title: "",
        city: "",
        streetName: "",
        price: "",
        areaSize: "",
        yearBuild: "",
        hasAC: false,
      });
    } catch (error) {
      console.error(error);
      errorToast("Error adding flat.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white rounded-xl shadow-xl max-h-[80vh] overflow-y-auto"
    >
      <h2 className="text-2xl font-bold text-orange-600 mb-4">Add New Flat</h2>

      {/* Render input fields dynamically */}
      {["title", "city", "streetName", "price", "areaSize", "yearBuild"].map((field) => (
        <div key={field}>
          <label htmlFor={field} className="block font-medium text-gray-700">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type={field === "yearBuild" ? "date" : "text"}
            id={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      ))}

      {/* Checkbox for AC */}
      <div>
        <label htmlFor="hasAC" className="inline-flex items-center text-sm">
          <input
            type="checkbox"
            id="hasAC"
            checked={formData.hasAC}
            onChange={handleChange}
            className="mr-2"
          />
          Has AC
        </label>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition w-full font-semibold"
      >
        Add Flat
      </button>
    </form>
  );
};

export default AddFlat;

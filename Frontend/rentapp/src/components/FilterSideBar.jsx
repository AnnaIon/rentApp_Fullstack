import React, { useEffect, useState } from "react";
import api from "../services/axios";

/**
 * FilterSidebar Component
 * Allows users to apply filters to the apartment list:
 * - Sort order (A-Z / Z-A)
 * - City selection
 * - Area size range
 * - Price range
 */
const FilterSidebar = ({ filter, setFilter, onApply }) => {
  const [cities, setCities] = useState([]);

  // Fetch unique cities from all apartments on initial render
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await api.get("/getAllApartments");
        const uniqueCities = [
          ...new Set(res.data.data.map((apt) => apt.city)),
        ];
        setCities(uniqueCities);
      } catch (err) {
        console.error("Failed to fetch cities", err);
      }
    };
    fetchCities();
  }, []);

  // Handle input changes and update filter state accordingly
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Reset all filter options to default state
  const resetFilter = () => {
    setFilter({
      AZ: false,
      ZA: false,
      city: "",
      minAreaRange: "",
      maxAreaRange: "",
      minPriceRange: "",
      maxPriceRange: "",
    });
  };

  return (
    <div className="bg-white/90 p-4 rounded-xl shadow-lg max-w-xs w-full">
      <h2 className="text-xl font-bold text-orange-600 mb-4">Filter Flats</h2>

      {/* Sort Options */}
      <div className="mb-4">
        <label className="font-semibold">Sort by:</label>
        <div className="flex gap-2 mt-2">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              name="AZ"
              checked={filter.AZ}
              onChange={handleChange}
            />
            A-Z
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              name="ZA"
              checked={filter.ZA}
              onChange={handleChange}
            />
            Z-A
          </label>
        </div>
      </div>

      {/* City Dropdown */}
      <div className="mb-4">
        <label className="font-semibold">City:</label>
        <select
          name="city"
          value={filter.city}
          onChange={handleChange}
          className="mt-2 block w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All Cities</option>
          {cities.map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Area Size Filter */}
      <div className="mb-4">
        <label className="font-semibold">Area Size (m²):</label>
        <div className="flex gap-2 mt-2">
          <input
            type="number"
            name="minAreaRange"
            value={filter.minAreaRange}
            onChange={handleChange}
            placeholder="Min"
            className="w-1/2 border px-2 py-1 rounded"
          />
          <input
            type="number"
            name="maxAreaRange"
            value={filter.maxAreaRange}
            onChange={handleChange}
            placeholder="Max"
            className="w-1/2 border px-2 py-1 rounded"
          />
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <label className="font-semibold">Price $:</label>
        <div className="flex gap-2 mt-2">
          <input
            type="number"
            name="minPriceRange"
            value={filter.minPriceRange}
            onChange={handleChange}
            placeholder="Min"
            className="w-1/2 border px-2 py-1 rounded"
          />
          <input
            type="number"
            name="maxPriceRange"
            value={filter.maxPriceRange}
            onChange={handleChange}
            placeholder="Max"
            className="w-1/2 border px-2 py-1 rounded"
          />
        </div>
      </div>

      {/* Filter Actions */}
      <div className="flex justify-between">
        <button
          onClick={onApply}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Apply
        </button>
        <button
          onClick={resetFilter}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;

import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import api from "../services/axios";
import FlatCard from "../components/FlatCard";
import FilterSidebar from "../components/FilterSideBar";

const Homepage = () => {
  // State to hold the list of all apartments fetched from the backend
  const [apartments, setApartments] = useState([]);

  // Controls whether the filter sidebar is open
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter state object for sorting and filtering apartments
  const [filter, setFilter] = useState({
    AZ: false,
    ZA: false,
    city: "",
    minAreaRange: "",
    maxAreaRange: "",
    minPriceRange: "",
    maxPriceRange: "",
  });

  // Fetch all apartments on initial load
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await api.get("/getAllApartments");
        setApartments(response.data.data);
      } catch (err) {
        console.error("Failed to fetch apartments:", err);
      }
    };

    fetchApartments();
  }, []);

  // Toggle the favorite status of an apartment
  const toggleFavorite = async (id) => {
    try {
      const response = await api.patch(`/apartment/favorite/${id}`);
      const updatedApartment = response.data.data;

      // Update the local state to reflect the change in favorite status
      setApartments((prev) =>
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

  // Apply selected filters by sending them to the backend and updating apartment list
  const applyFilters = async () => {
    try {
      const response = await api.post("/filterApartments", filter);
      setApartments(response.data.data);
      setIsFilterOpen(false); // Close filter sidebar after applying
    } catch (err) {
      console.error("Error applying filters:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 via-white to-gray-100">
      {/* Top navigation */}
      <Navbar />

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Page heading and filter toggle button */}
        <div className="relative flex items-center justify-center mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-600 text-center">
            Explore Available Apartments
          </h1>
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="absolute left-0 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded shadow-md transition"
          >
            {isFilterOpen ? "Close Filters" : "Open Filters"}
          </button>
        </div>

        {/* Main layout: filter sidebar and apartment cards */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Conditionally render sidebar if open */}
          {isFilterOpen && (
            <FilterSidebar
              filter={filter}
              setFilter={setFilter}
              onApply={applyFilters}
            />
          )}

          {/* Grid of apartment cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map((apt) => (
              <FlatCard
                key={apt._id}
                flat={apt}
                onToggleFavorite={toggleFavorite}
                showFavorite={true}
                showEdit={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

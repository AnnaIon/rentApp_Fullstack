import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import api from "../services/axios";
import FlatCard from "../components/FlatCard";
import FilterSidebar from "../components/FilterSideBar";

const Homepage = () => {
  const [apartments, setApartments] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState({
    AZ: false,
    ZA: false,
    city: "",
    minAreaRange: "",
    maxAreaRange: "",
    minPriceRange: "",
    maxPriceRange: "",
  });

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

  const toggleFavorite = async (id) => {
    try {
      const response = await api.patch(`/apartment/favorite/${id}`);
      const updatedApartment = response.data.data;

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

  const applyFilters = async () => {
    try {
      const response = await api.post("/filterApartments", filter);
      setApartments(response.data.data);
      setIsFilterOpen(false);
    } catch (err) {
      console.error("Error applying filters:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 via-white to-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="relative flex items-center justify-center mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-600 text-center">
    fu        Explore Available Apartments
          </h1>
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="absolute left-0 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded shadow-md transition"
          >
            {isFilterOpen ? "Close Filters" : "Open Filters"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {isFilterOpen && (
            <FilterSidebar
              filter={filter}
              setFilter={setFilter}
              onApply={applyFilters}
            />
          )}

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

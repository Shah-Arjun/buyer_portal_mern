import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import API from "../services/authServices";

function Card({ property }) {
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false);

  // Toggle favourite with optimistic update
const toggleFavourite = async (e) => {
  e.stopPropagation();
  if (!property?._id) return;

  const previousState = isFavourite;

  try {
    // Optimistic UI update
    setIsFavourite((prev) => !prev);

    // FIXED: Use correct endpoint
    const res = await API.post("/favourites/toggle", {
      propertyId: property._id,
    });

    // Update with backend response
    setIsFavourite(res.data.isFavourite === true);   // make sure it's boolean

    // Notify Navbar and Dashboard to refresh
    window.dispatchEvent(new Event("favouritesUpdated"));
  } catch (err) {
    console.error("Toggle favourite failed:", err);

    if (err.response?.status === 404) {
      console.warn("Toggle endpoint not found. Check your route mounting.");
    } else {
      setIsFavourite(previousState); // revert on real error
    }
  }
};

  // Check initial favourite status
useEffect(() => {
  const checkFavourite = async () => {
    if (!property?._id) return;

    try {
      const res = await API.get("/favourites");        // ← This is correct
      const exists = res.data.favourites?.some(
        (item) => item._id === property._id
      );
      setIsFavourite(exists);
    } catch (err) {
      if (err.response?.status === 404) {
        console.warn("Favourites endpoint not ready");
        setIsFavourite(false);
      } else {
        console.error("Failed to fetch favourite status:", err);
        setIsFavourite(false);
      }
    }
  };

  checkFavourite();
}, [property._id]);

  const handleViewDetails = () => {
    navigate(`/property/${property._id}`);
  };

  return (
    <div
      className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
      onClick={handleViewDetails}
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-36 sm:h-40 md:h-44 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Favourite Button (Heart Icon) */}
        <button
          onClick={toggleFavourite}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 bg-white/90 backdrop-blur-md rounded-full shadow hover:bg-white transition-all active:scale-90"
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all ${
              isFavourite
                ? "fill-red-500 text-red-500"
                : "text-gray-700 hover:text-red-500"
            }`}
          />
        </button>

        {property.featured && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-indigo-600 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {property.title}
        </h3>

        {/* Rating + Location */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1 gap-1">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 text-xs sm:text-sm">
              ⭐ {property.rating || 4.5}
            </span>
            <span className="text-gray-400 text-[10px] sm:text-xs">
              ({property.reviews || 12})
            </span>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1">
            📍 {property.location}
          </p>
        </div>

        {/* Price */}
        <div className="mt-3">
          <span className="text-lg font-bold text-indigo-600">
            Rs. {Number(property.price).toLocaleString()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium py-2.5 rounded-lg transition-all active:scale-[0.97]"
          >
            View Details
          </button>

          <button
            onClick={toggleFavourite}
            className={`flex-1 border text-xs sm:text-sm font-medium py-2.5 rounded-lg transition-all active:scale-[0.97] ${
              isFavourite
                ? "border-red-500 text-red-500 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            {isFavourite ? "Saved ❤️" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
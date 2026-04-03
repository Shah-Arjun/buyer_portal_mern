import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

function Card({ property }) {
  const navigate = useNavigate();

  // ✅ Lazy initialization - No useEffect needed for initial check
  const [isFavourite, setIsFavourite] = useState(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    return favourites.some(
      (item) => item._id === property._id || item.id === property.id
    );
  });

  const toggleFavourite = (e) => {
    e.stopPropagation();

    let favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

    if (isFavourite) {
      // Remove
      favourites = favourites.filter(
        (item) => item._id !== property._id && item.id !== property.id
      );
    } else {
      // Add
      favourites.push(property);
    }

    localStorage.setItem("favourites", JSON.stringify(favourites));
    setIsFavourite(!isFavourite);

    // Notify Navbar
    window.dispatchEvent(new Event("storage"));
  };

  const handleViewDetails = () => {
    navigate(`/property/${property._id || property.id}`);
  };

  return (
    <div
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={property.image || "https://via.placeholder.com/400x300"}
          alt={property.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Favourite Heart Button */}
        <button
          onClick={toggleFavourite}
          className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-md hover:bg-white transition-all active:scale-90"
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              isFavourite
                ? "fill-red-500 text-red-500"
                : "text-gray-700 hover:text-red-500"
            }`}
          />
        </button>

        {property.featured && (
          <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {property.title}
        </h3>

        <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
          📍 {property.location}
        </p>

        <div className="mt-5">
          <span className="text-2xl font-bold text-indigo-600">
            Rs. {Number(property.price).toLocaleString()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all active:scale-[0.97]"
          >
            View Details
          </button>

          <button
            onClick={toggleFavourite}
            className={`flex-1 border font-semibold py-3 rounded-xl transition-all active:scale-[0.97] ${
              isFavourite
                ? "border-red-500 text-red-500 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            {isFavourite ? "Saved ❤️" : "Favourite"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
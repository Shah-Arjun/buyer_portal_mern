import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

function Card({ property }) {
  const navigate = useNavigate();


  // lazy initialization 
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
    navigate(`/property/${property._id}`);
  };

  return (
    <div
      className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer w-full max-w-sm mx-auto"
      onClick={handleViewDetails}
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-36 sm:h-40 md:h-44 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Favourite Button */}
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
      <div className="p-4 sm:p-4 flex flex-col">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {property.title}
        </h3>

        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <span className="text-yellow-500 text-xs sm:text-sm">
            ⭐ {property.rating || 4.5}
          </span>
          <span className="text-gray-400 text-[10px] sm:text-xs">
            ({property.reviews || 12} reviews)
          </span>
        </div>

        {/* Location */}
        <p className="text-gray-500 text-xs sm:text-sm mt-1 flex items-center gap-1">
          📍 {property.location}
        </p>

        <div className="mt-3 sm:mt-4">
          <span className="text-md sm:text-md md:text-xl font-bold text-indigo-600">
            Rs. {Number(property.price).toLocaleString()}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-row sm:flex-row gap-2 mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium py-2 sm:py-2 rounded-lg transition-all active:scale-[0.97]"
          >
            View
          </button>

          <button
            onClick={toggleFavourite}
            className={`flex-1 border text-xs sm:text-sm font-medium py-2 sm:py-2.5 rounded-lg transition-all active:scale-[0.97] ${
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
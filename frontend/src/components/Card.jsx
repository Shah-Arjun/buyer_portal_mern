import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import API from "../services/authServices";



const Card = ({ property }) => {
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false);

  //heart/favourite on click toggle function
  const toggleFavourite = async (e) => {
    e.stopPropagation();   //prevents parent click event -> without this clicking hear would open property page
    if(!property?._id) return;

    const previousState = isFavourite;

    try {
      setIsFavourite((prev) => !prev);  //toggle

      const res = await API.post("/favourites/toggle", {propertyId: property._id})

      console.log("from card---->", res.data)
      
      // update frontend as per backend response
      setIsFavourite(res.data.isFavourite === true)

      // notify  Navbar and Dashboard to refresh
      window.dispatchEvent(new Event("favouritesUpdated"))
    } catch (err) {
      setIsFavourite(previousState); // revert on real error
      alert("Something went wrong. Please try again.")

      console.error("Toggle favourite error:", err) // debug
    }
  };



  // check initial favourite status
  useEffect(() => {
    // function to check if property is already saved?
    const checkFavourite = async () => {
      if (!property?._id) return;

      try {
        const res = await API.get("/favourites");

        // checks if current property exists in favourites
        const exists = res.data.favourites?.some(
          (item) => item._id === property._id,
        );

        setIsFavourite(exists);
      } catch (err) {
        setIsFavourite(false)
        console.error("Failed to fetch favourite", err)
      }
    };

    checkFavourite()
  }, [property._id]);


  // handle view details button
  const handleViewDetails = () => {
    navigate(`/property/${property._id}`);
  };



  return (
    <div
      className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
      onClick={handleViewDetails}
    >
      {/* image section */}
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-36 sm:h-36 md:h-44 lg:h-42 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* favourite button / heart icon */}
        <button
          onClick={toggleFavourite}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 bg-white/90 backdrop-blur-md rounded-full shadow hover:bg-white transition-all active:scale-90"
        >
          <Heart className={`w-4 h-4 sm:w-5 sm:h-5 transition-all ${
              isFavourite
                ? "fill-red-500 text-red-500"
                : "text-gray-700 hover:text-red-500"
            }`}
          />
        </button>

        {property.isFeatured && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gray-200 text-black text-[10px] sm:text-xs px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* content */}
      <div className="p-4 flex flex-col">
        <h3 className="text-sm sm:text-base md:text-md font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {property.title}
        </h3>

        {/* rating & rocation */}
        <div className="flex justify-between items-center mt-1">
          <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1">
            {property.location}
          </p>

          <span className="text-yellow-500 text-xs sm:text-sm flex items-center gap-1">
            ⭐ {property.rating || 4.5}
          </span>
        </div>

        {/* price */}
        <div className="mt-1">
          <span className="text-md font-bold text-indigo-600">
            Rs. {Number(property.price).toLocaleString()}
          </span>
        </div>

        {/* action buttons */}
        <div className="flex flex-row sm:flex-row gap-2 mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium py-2 rounded-lg transition-all active:scale-[0.97]"
          >
            View Details
          </button>

          <button
            onClick={toggleFavourite}
            className={`flex-1 border text-xs sm:text-sm font-medium py-2 rounded-lg transition-all active:scale-[0.97] ${
              isFavourite
                ? "border-red-500 text-red-500 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            {isFavourite ? "Saved ❤️" : "Add to Favourite"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

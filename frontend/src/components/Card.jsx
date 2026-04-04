import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import API from "../services/authServices";
import { useAuth } from "../context/AuthContext";  



const Card = ({ property }) => {
  const navigate = useNavigate();
  const { user } = useAuth();           //get user rom authcontext            

  const [isFavourite, setIsFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);





  // Check if property is already in favourites
  useEffect(() => {
    const checkFavourite = async () => {
      if (!user || !property?._id) {
        setIsFavourite(false);
        return;
      }

      try {
        const res = await API.get("/favourites");
        const exists = res.data.favourites?.some(
          (item) => item._id === property._id
        );
        setIsFavourite(exists);
      } catch (err) {
        console.error("Failed to fetch favourite status:", err);
        setIsFavourite(false);
      }
    };

    checkFavourite();
  }, [property._id, user]);




  
  // heart/addtofavourite button toggle handler
  const toggleFavourite = async (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Please login to save favourites");
      navigate("/auth");
      return;
    }

    if (!property?._id || isLoading) return;

    const previousState = isFavourite;
    setIsLoading(true);

    try {
      setIsFavourite((prev) => !prev); // toggle

      const res = await API.post("/favourites/toggle", {
        propertyId: property._id,
      });

      // update based on backend response
      setIsFavourite(res.data.isFavourite === true);

      // notify navbar & dashboard
      window.dispatchEvent(new Event("favouritesUpdated"));
    } catch (err) {
      setIsFavourite(previousState);         // revert on error
      console.error("Toggle favourite error:", err);

      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/auth");
      } else {
        alert("Failed to update favourite. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };




  //handle view details button
  const handleViewDetails = () => {
    navigate(`/property/${property._id}`);
  };




  return (
    <div
      className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
      onClick={handleViewDetails}
    >
      {/* Image section */}
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-36 sm:h-36 md:h-44 lg:h-42 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Heart button */}
        <button
          onClick={toggleFavourite}
          disabled={isLoading}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 bg-white/90 backdrop-blur-md rounded-full shadow hover:bg-white transition-all active:scale-90 disabled:opacity-70"
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all ${
              isFavourite
                ? "fill-red-500 text-red-500"
                : "text-gray-700 hover:text-red-500"
            }`}
          />
        </button>

        {property.isFeatured && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gray-200 text-black text-[10px] sm:text-xs px-2 py-1 rounded-full">Featured</div>
        )}
      </div>   {/* image section endds here */}




      {/* contents section */}
      <div className="p-4 flex flex-col">
        <h3 className="text-sm sm:text-base md:text-md font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">{property.title}</h3>

        <div className="flex justify-between items-center mt-1">
          <p className="text-gray-500 text-xs sm:text-sm">{property.location}</p>
          <span className="text-yellow-500 text-xs sm:text-sm">⭐ {property.rating || 4.5}</span>
        </div>

        <div className="mt-1">
          <span className="text-md font-bold text-indigo-600">Rs. {Number(property.price).toLocaleString()}</span>
        </div>


      {/* action button */}
        <div className="flex flex-row gap-2 mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-all"
          >
            View Details
          </button>


          <button
            onClick={toggleFavourite}
            disabled={isLoading}
            className={`flex-1 border text-xs sm:text-sm font-medium py-2 rounded-lg transition-all ${
              isFavourite
                ? "border-red-500 text-red-500 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            {isFavourite ? "Saved ❤️" : "Add to Favourite"}
          </button>
        </div>
      </div>  {/*content section ends here */}



    </div> 
  );
};

export default Card;
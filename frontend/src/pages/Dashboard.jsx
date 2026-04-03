import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Heart, Trash2, ArrowLeft, User, Home, Settings, Eye } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (err) {
        console.log(err);
        return null;
      }
    }
    return null;
  });

  const [favourites, setFavourites] = useState(() => {
    return JSON.parse(localStorage.getItem("favourites") || "[]");
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedFavs = JSON.parse(localStorage.getItem("favourites") || "[]");
      setFavourites(updatedFavs);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const removeFavourite = (id) => {
    const updatedFavs = favourites.filter(
      (item) => item._id !== id && item.id !== id
    );
    localStorage.setItem("favourites", JSON.stringify(updatedFavs));
    setFavourites(updatedFavs);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* Sidebar - Hidden on mobile, shown on lg+ */}
          <div className="lg:w-72 bg-white rounded-3xl shadow p-6 h-fit lg:sticky lg:top-24">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 px-4 py-3 mb-6 text-left rounded-2xl hover:bg-gray-100 transition w-full"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Listings</span>
            </button>

            {user && (
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-4xl font-bold mb-4">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <h2 className="font-semibold text-xl">{user.name}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <p className="text-xs bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full mt-3 capitalize">
                  {user.role || "User"}
                </p>
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-2xl font-medium">
                <Heart className="w-5 h-5" />
                My Favourites
                <span className="ml-auto bg-white px-3 py-0.5 rounded-full text-sm font-semibold">
                  {favourites.length}
                </span>
              </div>

              <button className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-2xl hover:bg-gray-100 transition">
                <Home className="w-5 h-5" />
                My Properties
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-2xl hover:bg-gray-100 transition">
                <User className="w-5 h-5" />
                My Profile
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-2xl hover:bg-gray-100 transition">
                <Settings className="w-5 h-5" />
                Settings
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
                <p className="text-gray-600">Manage your favourite properties</p>
              </div>

              <div className="bg-white px-5 py-3 rounded-2xl shadow flex items-center gap-3 whitespace-nowrap">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-semibold hidden sm:inline">Total Favourites:</span>
                <span className="text-3xl font-bold text-indigo-600">{favourites.length}</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Favourite Properties
            </h2>

            {favourites.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 lg:p-20 text-center">
                <Heart className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                <h3 className="text-2xl font-medium text-gray-400">No favourites yet</h3>
                <p className="text-gray-500 mt-2">Saved properties will appear here</p>
                <button
                  onClick={() => navigate("/properties")}
                  className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition"
                >
                  Browse Properties
                </button>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block bg-white rounded-3xl shadow overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-5 px-6 font-medium text-gray-600">Category</th>
                        <th className="text-left py-5 px-6 font-medium text-gray-600">Title</th>
                        <th className="text-left py-5 px-6 font-medium text-gray-600">Location</th>
                        <th className="text-right py-5 px-6 font-medium text-gray-600">Price</th>
                        <th className="text-center py-5 px-6 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {favourites.map((property) => (
                        <tr key={property._id} className="border-b hover:bg-gray-50 transition">
                          
                          <td className="py-4 px-6">
                            <p className="font-semibold text-sm text-gray-800 line-clamp-2">
                                type
                              </p>
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex items-center gap-4">
                              <p className="font-semibold text-sm text-gray-800 line-clamp-2">
                                {property.title}
                              </p>
                            </div>
                          </td>

                          <td className="py-4 px-4 text-sm text-gray-600">{property.location}</td>

                          <td className="py-4 px-4 text-right text-sm font-bold text-indigo-600">
                            Rs. {Number(property.price).toLocaleString()}
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex justify-center gap-3">
                              <button
                                onClick={() => navigate(`/property/${property._id}`)}
                                className="flex items-center gap-2 px-4 bg-indigo-50 text-indigo-700 rounded-2xl hover:bg-indigo-100 transition"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => removeFavourite(property._id)}
                                className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile & Tablet Card View */}
                <div className="grid md:grid-cols-2 gap-4 lg:hidden">
                  {favourites.map((property) => (
                    <div
                      key={property._id}
                      className="bg-white rounded-3xl shadow overflow-hidden"
                    >
                      <div className="relative">
                        <img
                          src={property.image || "https://via.placeholder.com/400x300"}
                          alt={property.title}
                          className="w-full h-48 object-cover"
                        />
                        <button
                          onClick={() => removeFavourite(property._id)}
                          className="absolute top-4 right-4 p-3 bg-white rounded-2xl shadow hover:bg-red-50 text-red-500 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="p-5">
                        <h3 className="font-semibold text-lg line-clamp-2">{property.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">📍 {property.location}</p>

                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-2xl font-bold text-indigo-600">
                            Rs. {Number(property.price).toLocaleString()}
                          </span>
                          <button
                            onClick={() => navigate(`/property/${property._id}`)}
                            className="px-5 py-2 bg-indigo-600 text-white rounded-2xl text-sm hover:bg-indigo-700 transition"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
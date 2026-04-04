import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import axios from "axios";
import { Search, SlidersHorizontal } from "lucide-react";

const categories = ["All", "Apartment", "House", "Land", "Commercial", "Flat", "Studio"];

function PropertiesListing() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 50000000]); // min and max price


  // Fetch Properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://buyer-portal-mern.onrender.com/api/property");
        const data = res.data.properties || res.data || [];
        setProperties(data ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);


  // Apply Filters
  useEffect(() => {
    let result = [...properties];

    // Category Filter
    if (selectedCategory !== "All") {
      result = result.filter(p => 
        p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price Range Filter
    result = result.filter(p => {
      const price = Number(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Search Filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.title?.toLowerCase().includes(term) ||
        p.location?.toLowerCase().includes(term)
      );
    }

    // Sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-high":
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        break;
      default:
        break;
    }

    setFilteredProperties(result);
  }, [searchTerm, selectedCategory, sortOption, priceRange, properties]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:w-60 bg-white rounded-3xl shadow p-6 h-fit lg:sticky lg:top-24">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">All Properties</h1>
            <p className="text-gray-600 mb-12 ">{filteredProperties.length} properties found</p>
            <h2 className="font-semibold text-lg my-6 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </h2>

            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-700 mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-2xl text-sm transition-all ${
                      selectedCategory === cat
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Price Range</h3>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="50000000"
                  step="500000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Rs. {priceRange[0].toLocaleString()}</span>
                  <span>Rs. {priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search & Sort Bar */}
            <div className="bg-white rounded-3xl shadow p-4 mb-8 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 py-3 rounded-2xl border border-gray-300 focus:border-indigo-500 outline-none"
                />
              </div>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-5 py-3 rounded-2xl border border-gray-300 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-5 py-3 rounded-2xl border border-gray-300 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>

              </select>
            </div>

            {/* Properties Grid */}
            {loading ? (
              <div className="text-center py-20">Loading properties...</div>
            ) : filteredProperties.length === 0 ? (
              <div className="bg-white rounded-3xl p-20 text-center">
                <p className="text-2xl text-gray-400">No properties found</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-6 xl:gap-6">
                {filteredProperties.map((property) => (
                  <Card key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesListing
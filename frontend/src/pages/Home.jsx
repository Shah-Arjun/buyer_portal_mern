import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MoveRight } from "lucide-react";

//components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";



function HomePage() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  // fetch all properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("https://buyer-portal-mern.onrender.com/api/property");
        setProperties(res.data.properties || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);



  // filter properties based on search text
  const filteredProperties = properties.filter((property) => {
    if (!searchTerm.trim()) return true;  //show all if no search term

    const term = searchTerm.toLowerCase().trim();
    return (
      property.title?.toLowerCase().includes(term) ||
      property.location?.toLowerCase().includes(term) ||
      property.description?.toLowerCase().includes(term) 
    );
  });


  // show only 8 properties on home page on render
  const featuredProperties = filteredProperties.slice(0, 8);




  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-indigo-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Property</h1>
        <p className="text-lg mb-6">Buy, sell, and rent properties across Nepal easily</p>

        {/* search bar */}
        <div className="max-w-xl mx-auto flex bg-white rounded-full overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Search by location or property title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-6 py-4 text-gray-700 outline-none text-md"
          />
          <button className="bg-indigo-500 px-10 text-white font-semibold rounded-full border border-gray-100 hover:bg-indigo-600 transition">Search</button>
        </div>
      </section>



      {/* LISTING FEATURED PROPERTIES */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Featured Properties</h2>
          <p className="text-gray-500 text-sm">Showing {featuredProperties.length} of {filteredProperties.length} properties</p>
        </div>

        {loading && (
          <div className="text-center py-20 text-lg">Loading properties...</div>
        )}

        {error && <div className="text-center py-12 text-red-500">{error}</div>}

        {/* fi searched term not matched */}
        {!loading && !error && featuredProperties.length === 0 && (
          <div className="text-center py-20 text-gray-500 text-xl">No properties found matching your search.</div>
        )}


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <Card key={property._id} property={property} />
          ))}
        </div>


        {/* view more button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/properties")}
            className="flex items-center gap-3 bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold px-4 py-2 hover:gap-5 rounded-full transition-all duration-300 text-md"
          >
            View All Properties
            <MoveRight />
          </button>
        </div>    {/*view more button section ends here */}

      </section>   {/*featured listing section ends here */}



      <Footer />
    </div>
  );
}

export default HomePage;

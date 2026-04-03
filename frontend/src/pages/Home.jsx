import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import axios from "axios";

function HomePage() {
  const [properties, setProperties] = useState([]);   // Always start as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("http://localhost:5000/api/property");

        console.log("res---------->",res.data)   //array

        setProperties(res.data.properties);
       
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again.");
        setProperties([]);  

      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);




  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-indigo-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Property</h1>
        <p className="text-lg mb-6">Buy, sell, and rent properties across Nepal easily</p>

        <div className="max-w-xl mx-auto flex bg-white rounded-full overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Search location, property type..."
            className="flex-grow px-4 py-3 text-gray-700 outline-none"
          />
          <button className="bg-indigo-500 px-8 border border-white rounded-full text-white font-semibold hover:bg-indigo-400 transition">
            Search
          </button>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Featured Properties
        </h2>

        {loading && (
          <div className="flex justify-center py-20">
            <p className="text-gray-600 text-lg">Loading properties...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-md">{error}</p>
          </div>
        )}

        {!loading && !error && properties.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No properties available at the moment.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {properties.map((property) => (
            <Card key={property._id} property={property} />
          ))}
        </div>
      </section>


      {/* CTA Section */}
      <section className="bg-indigo-100 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Want to Sell Your Property?</h2>
        <p className="text-gray-600 mb-6">List your property and reach thousands of buyers</p>
        <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-500 transition">
          Add Property
        </button>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
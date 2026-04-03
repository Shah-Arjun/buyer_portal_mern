import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


// dummy data
const properties = [
  {
    id: 1,
    title: "Modern Apartment in Kathmandu",
    location: "Baneshwor, Kathmandu",
    price: "Rs. 85,00,000",
    image: "https://source.unsplash.com/400x300/?apartment",
  },
  {
    id: 2,
    title: "Luxury House in Pokhara",
    location: "Lakeside, Pokhara",
    price: "Rs. 1,50,00,000",
    image: "https://source.unsplash.com/400x300/?house",
  },
  {
    id: 3,
    title: "Budget Flat in Lalitpur",
    location: "Jawalakhel, Lalitpur",
    price: "Rs. 35,00,000",
    image: "https://source.unsplash.com/400x300/?flat",
  },
];



function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-indigo-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Property</h1>
        <p className="text-lg mb-6">Buy, sell, and rent properties across Nepal easily</p>

        {/* search Bbar */}
        <div className="max-w-xl mx-auto flex bg-white rounded-full overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Search location..."
            className="flex-grow px-4 py-2 text-gray-700 outline-none"
          />
          <button className="bg-indigo-500 px-6 text-white font-semibold hover:bg-indigo-400 rounded-full border border-white">Search</button>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Featured Properties</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow hover:shadow-lg transition">
              <img src={property.image} alt={property.title} className="w-full h-48 object-cover rounded-t-xl"/>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {property.title}
                </h3>
                <p className="text-gray-500">{property.location}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-indigo-600 font-bold">
                    {property.price}
                  </span>

                  <button className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm hover:bg-indigo-500">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* CTA */}
      <section className="bg-indigo-100 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Want to Sell Your Property?</h2>
        <p className="text-gray-600 mb-6">List your property and reach thousands of buyers</p>

        <button className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-500">Add Property</button>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
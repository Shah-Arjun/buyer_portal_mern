function Card({ property }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img 
        src={property.image} 
        alt={property.title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
        <p className="text-gray-500 text-sm mt-1">{property.location}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-indigo-600 font-bold text-xl">
            Rs. {property.price.toLocaleString()}
          </span>
          <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-indigo-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
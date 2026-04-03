// src/components/Footer.jsx

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 mt-12 bottom-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
          
          {/* company info */}
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Adam's Real Estate</h2>
            <p className="text-gray-400">
              Find your dream property in Nepal with ease.
            </p>
          </div>

          {/* navigation links */}
          <div className="flex flex-col space-y-2">
            <a href="/" className="hover:text-white transition">
              Home
            </a>
            <a href="/properties" className="hover:text-white transition">
              Properties
            </a>
            <a href="/about" className="hover:text-white transition">
              About Us
            </a>
            <a href="/contact" className="hover:text-white transition">
              Contact
            </a>
          </div>

          {/* contact info */}
          <div className="flex flex-col space-y-2">
            <p>Email: info@adamsrealestate.com</p>
            <p>Phone: +977 98XXXXXXXX</p>
            <p>Kathmandu, Nepal</p>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Adam's Real Estate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
import { Link } from 'react-router-dom';

const Wrapper = ({children}) => {
    return (
        <>
            <div className="min-h-screen">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">OUr Name</Link>
        <div className="space-x-8">
          <button className="hover:text-blue-200 transition">Solutions</button>
          <button className="hover:text-blue-200 transition">About</button>
          <Link 
            to="/profile" 
            className="hover:text-blue-200 transition"
          >
            Profile
          </Link>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Abridge</h3>
              <p className="text-sm">
                Transforming healthcare documentation with AI-powered solutions.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">For Doctors</a></li>
                <li><a href="#" className="hover:text-white">For Hospitals</a></li>
                <li><a href="#" className="hover:text-white">For Clinics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; 2024 Abridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
        </>
    )
}

export default Wrapper;
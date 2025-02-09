import { useState } from "react";
import { Link } from "react-router-dom";

const Wrapper = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let userData = null;

  try {
    const getLocalUser = localStorage.getItem("user_introspect");
    userData = getLocalUser ? JSON.parse(getLocalUser) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  const signOut = async () => {
    try {
      await auth.signOut();
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
              IntrospectAI
            </p>
          </Link>
          <div className="space-x-8 flex items-center">
            <button className="hover:text-blue-200 transition">Solutions</button>
            <button className="hover:text-blue-200 transition">About</button>
			{userData && (<Link to="/apps" className="hover:text-blue-200 transition">
									Dashboard
								</Link>)}
            {userData && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="hover:text-blue-200 transition flex items-center space-x-2"
                >
                  {userData.photoURL && (
                    <img
                      src={userData.photoURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border border-gray-300"
                    />
                  )}
                  <span>{userData.displayName}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2">
                    <button
                      onClick={signOut}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-lg"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}
            {!userData && (
              <Link to="/login" className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition">
                Login
              </Link>
            )}
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">Abridge</h3>
                <p className="text-sm">Transforming healthcare documentation with AI-powered solutions.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Solutions</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white">For Doctors</a></li>
                  <li><a href="#" className="hover:text-white">For Hospitals</a></li>
                  <li><a href="#" className="hover:text-white">For Clinics</a></li>
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
  );
};

export default Wrapper;

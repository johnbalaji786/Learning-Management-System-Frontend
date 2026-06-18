import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, user } = {
    isAuthenticated: false,

    user: {
      name: "Balaji",
      role: "student", // student | tutor | admin
    },
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}

          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">LMS</span>
            </div>

            <div>
              <h1 className="font-bold text-lg text-gray-900">LearnHub</h1>

              <p className="text-xs text-gray-500">Learn • Grow • Succeed</p>
            </div>
          </Link>

          {/* NAVIGATION */}

          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>

            <Link
              to="/courses"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Courses
            </Link>

            <Link
              to="/tutors"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Tutors
            </Link>

            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative group">
                {/* PROFILE */}

                <button className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="text-left">
                    <p className="font-medium text-gray-800">{user?.name}</p>

                    <p className="text-xs text-gray-500 capitalize">
                      {user?.role}
                    </p>
                  </div>
                </button>

                {/* DROPDOWN */}

                <div
                  className="
                absolute 
                right-0 
                top-full 
                mt-2
                w-60
                bg-white
                rounded-xl
                shadow-lg
                border
                border-gray-100
                opacity-0
                invisible
                group-hover:opacity-100
                group-hover:visible
                transition-all
                duration-200
                z-50
                "
                >
                  {/* STUDENT MENU */}

                  {user?.role === "student" && (
                    <>
                      <Link
                        to="/student/dashboard"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/bookings"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        My Bookings
                      </Link>

                      <Link
                        to="/payments"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        Payments
                      </Link>

                      <Link
                        to="/reviews"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        Reviews
                      </Link>
                    </>
                  )}

                  {/* TUTOR MENU */}

                  {user?.role === "tutor" && (
                    <>
                      <Link
                        to="/tutor/dashboard"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/my-courses"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        My Courses
                      </Link>

                      <Link
                        to="/bookings"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        Bookings
                      </Link>

                      <Link
                        to="/earnings"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        Earnings
                      </Link>
                    </>
                  )}

                  {/* ADMIN MENU */}

                  {user?.role === "admin" && (
                    <>
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/users"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        Manage Users
                      </Link>

                      <Link
                        to="/courses"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        Manage Courses
                      </Link>

                      <Link
                        to="/payments"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        Payments
                      </Link>
                    </>
                  )}

                  <hr />

                  <button
                    className="
                w-full
                text-left
                px-4
                py-3
                text-red-600
                hover:bg-red-50
                "
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { HiMenu, HiX } from "react-icons/hi";

import { FaUserCircle, FaChevronDown } from "react-icons/fa";

import { toast } from "react-toastify";

import { clearUser, setUser } from "../redux/authSlice";

import { getMe, logoutUser } from "../services/authServices";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (!loading) return;

    const loadUser = async () => {
      try {
        const response = await getMe();
        dispatch(setUser(response.user));
      } catch (error) {
        dispatch(clearUser());
      }
    };

    loadUser();
  }, [dispatch, loading]);

  const handleLogout = async () => {
    try {
      await logoutUser();

      dispatch(clearUser());

      toast.success("Logged out successfully");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      dispatch(clearUser());

      toast.error("Logout failed");

      navigate("/login", {
        replace: true,
      });
    }
  };

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 h-16 backdrop-blur-xl bg-white/80 border-b border-white/30 shadow-lg"></nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">LMS</span>
            </div>

            <div>
              <h1 className="font-bold text-lg text-gray-900">LearnHub</h1>

              <p className="text-xs text-gray-500">Learn • Grow • Succeed</p>
            </div>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600 transition"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/courses"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600 transition"
              }
            >
              Courses
            </NavLink>

            <NavLink
              to="/tutors"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600 transition"
              }
            >
              Tutors
            </NavLink>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                    {user?.name ? (
                      <span className="font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <FaUserCircle size={22} />
                    )}
                  </div>

                  <div className="hidden lg:block text-left">
                    <p className="font-semibold text-gray-800">{user?.name}</p>

                    <p className="text-xs capitalize text-gray-500">
                      {user?.role}
                    </p>
                  </div>

                  <FaChevronDown className="text-gray-500" />
                </button>

                <div
                  className="
                    absolute
                    right-0
                    top-full
                    mt-3
                    w-64
                    rounded-2xl
                    bg-white
                    shadow-2xl
                    border
                    border-gray-100
                    opacity-0
                    invisible
                    group-hover:opacity-100
                    group-hover:visible
                    transition-all
                    duration-300
                    overflow-hidden
                  "
                >
                  {user?.role === "student" && (
                    <>
                      <Link
                        to="/student/dashboard"
                        className="block px-5 py-3 hover:bg-blue-50"
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/my-bookings"
                        className="block px-5 py-3 hover:bg-blue-50"
                      >
                        My Bookings
                      </Link>
                    </>
                  )}

                  {user?.role === "tutor" && (
                    <>
                      <Link
                        to="/tutor/dashboard"
                        className="block px-5 py-3 hover:bg-blue-50"
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/tutor/my-courses"
                        className="block px-5 py-3 hover:bg-blue-50"
                      >
                        My Courses
                      </Link>

                      <Link
                        to="/tutor/bookings"
                        className="block px-5 py-3 hover:bg-blue-50"
                      >
                        Manage Bookings
                      </Link>

                      <Link
                        to="/tutor/create-course"
                        className="block px-5 py-3 hover:bg-blue-50"
                      >
                        Create Course
                      </Link>
                    </>
                  )}

                  {user?.role === "admin" && (
                    <>
                      <Link
                        to="/admin/dashboard"
                        className="block px-5 py-3 hover:bg-blue-50"
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/users"
                        className="block px-5 py-3 hover:bg-blue-50"
                      >
                        Manage Users
                      </Link>

                      <Link
                        to="/courses"
                        className="block px-5 py-3 hover:bg-blue-50"
                      >
                        Manage Courses
                      </Link>
                    </>
                  )}

                  <hr />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            <button
              className="md:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}

      {mobileMenu && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col px-6 py-5 space-y-4">
            <NavLink
              to="/"
              onClick={() => setMobileMenu(false)}
              className="text-gray-700 hover:text-blue-600"
            >
              Home
            </NavLink>

            <NavLink
              to="/courses"
              onClick={() => setMobileMenu(false)}
              className="text-gray-700 hover:text-blue-600"
            >
              Courses
            </NavLink>

            <NavLink
              to="/tutors"
              onClick={() => setMobileMenu(false)}
              className="text-gray-700 hover:text-blue-600"
            >
              Tutors
            </NavLink>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="text-gray-700"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileMenu(false)}
                  className="bg-blue-600 text-white text-center py-2 rounded-lg"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {user?.role === "student" && (
                  <>
                    <Link
                      to="/student/dashboard"
                      onClick={() => setMobileMenu(false)}
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/my-bookings"
                      onClick={() => setMobileMenu(false)}
                    >
                      My Bookings
                    </Link>
                  </>
                )}

                {user?.role === "tutor" && (
                  <>
                    <Link
                      to="/tutor/dashboard"
                      onClick={() => setMobileMenu(false)}
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/tutor/my-courses"
                      onClick={() => setMobileMenu(false)}
                    >
                      My Courses
                    </Link>

                    <Link
                      to="/tutor/bookings"
                      onClick={() => setMobileMenu(false)}
                    >
                      Manage Bookings
                    </Link>

                    <Link
                      to="/tutor/create-course"
                      onClick={() => setMobileMenu(false)}
                    >
                      Create Course
                    </Link>
                  </>
                )}

                {user?.role === "admin" && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setMobileMenu(false)}
                    >
                      Dashboard
                    </Link>

                    <Link to="/users" onClick={() => setMobileMenu(false)}>
                      Manage Users
                    </Link>

                    <Link to="/courses" onClick={() => setMobileMenu(false)}>
                      Manage Courses
                    </Link>
                  </>
                )}

                <button
                  onClick={() => {
                    setMobileMenu(false);
                    handleLogout();
                  }}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

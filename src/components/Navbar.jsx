import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Users,
  PlusCircle,
  CalendarDays,
  IndianRupee,
} from "lucide-react";

import { clearUser, setUser, startLoading } from "../redux/authSlice";
import { getMe, logoutUser } from "../services/authServices";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    dispatch(startLoading());

    const loadUser = async () => {
      try {
        const response = await getMe();
        dispatch(setUser(response.user));
      } catch (error) {
        dispatch(clearUser());
      }
    };

    loadUser();
  }, [dispatch]);

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

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}

          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              LMS
            </div>

            <div>
              <h1 className="font-bold text-lg">LearnHub</h1>

              <p className="text-xs text-gray-500">Learn • Grow • Succeed</p>
            </div>
          </Link>

          {/* Desktop Menu */}

          <div className="hidden lg:flex items-center gap-6">
            <Link to="/" className="font-medium hover:text-blue-600">
              Home
            </Link>

            <Link to="/courses" className="font-medium hover:text-blue-600">
              Courses
            </Link>

            <Link to="/tutors" className="font-medium hover:text-blue-600">
              Tutors
            </Link>

            {isAuthenticated && user?.role === "student" && (
              <>
                <Link
                  to="/student/dashboard"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <Link
                  to="/my-bookings"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <CalendarDays size={18} />
                  My Bookings
                </Link>
              </>
            )}

            {isAuthenticated && user?.role === "tutor" && (
              <>
                <Link
                  to="/tutor/dashboard"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <Link
                  to="/tutor/my-courses"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <BookOpen size={18} />
                  My Courses
                </Link>

                <Link
                  to="/tutor/create-course"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <PlusCircle size={18} />
                  Create Course
                </Link>

                <Link
                  to="/tutor/bookings"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <CalendarDays size={18} />
                  Bookings
                </Link>
              </>
            )}

            {isAuthenticated && user?.role === "admin" && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <Link
                  to="/users"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <Users size={18} />
                  Manage Users
                </Link>
              </>
            )}
            {loading ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            ) : !isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/login" className="font-medium hover:text-blue-600">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="text-left">
                    <p className="font-medium">{user?.name}</p>

                    <p className="text-xs text-gray-500 capitalize">
                      {user?.role}
                    </p>
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-xl border overflow-hidden">
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold">{user?.name}</p>

                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}

            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}

        {menuOpen && (
          <div className="lg:hidden border-t py-4 space-y-3">
            <Link to="/" className="block py-2">
              Home
            </Link>

            <Link to="/courses" className="block py-2">
              Courses
            </Link>

            <Link to="/tutors" className="block py-2">
              Tutors
            </Link>

            {!isAuthenticated ? (
              <>
                <Link to="/login" className="block py-2">
                  Login
                </Link>

                <Link to="/register" className="block py-2">
                  Register
                </Link>
              </>
            ) : (
              <>
                {user?.role === "student" && (
                  <>
                    <Link
                      to="/student/dashboard"
                      className="flex items-center gap-2 py-2"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>

                    <Link
                      to="/my-bookings"
                      className="flex items-center gap-2 py-2"
                    >
                      <CalendarDays size={18} />
                      My Bookings
                    </Link>
                  </>
                )}

                {user?.role === "tutor" && (
                  <>
                    <Link
                      to="/tutor/dashboard"
                      className="flex items-center gap-2 py-2"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>

                    <Link
                      to="/tutor/my-courses"
                      className="flex items-center gap-2 py-2"
                    >
                      <BookOpen size={18} />
                      My Courses
                    </Link>

                    <Link
                      to="/tutor/create-course"
                      className="flex items-center gap-2 py-2"
                    >
                      <PlusCircle size={18} />
                      Create Course
                    </Link>

                    <Link
                      to="/tutor/bookings"
                      className="flex items-center gap-2 py-2"
                    >
                      <CalendarDays size={18} />
                      Manage Bookings
                    </Link>
                    <Link
                      to="/tutor/payments"
                      className="flex items-center gap-2 py-2"
                    >
                      Earnings
                    </Link>
                  </>
                )}

                {user?.role === "admin" && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center gap-2 py-2"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>

                    <Link to="/users" className="flex items-center gap-2 py-2">
                      <Users size={18} />
                      Manage Users
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-2 text-red-600"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

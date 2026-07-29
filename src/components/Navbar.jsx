import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearUser, setUser, startLoading } from "../redux/authSlice";
import { getMe, logoutUser } from "../services/authServices";

const Navbar = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/login", { replace: true });
    } catch (error) {
      dispatch(clearUser());
      toast.error("Logout failed");
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">LMS</span>
            </div>

            <div>
              <h1 className="font-bold text-lg text-gray-900">LearnHub</h1>
              <p className="text-xs text-gray-500">Learn • Grow • Succeed</p>
            </div>
          </Link>

          {/* Navigation */}
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

            {loading ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                <div>
                  <div className="w-20 h-3 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="w-14 h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ) : !isAuthenticated ? (
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
                <button className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="text-left">
                    <p className="font-medium text-gray-800">{user?.name}</p>

                    <p className="text-xs text-gray-500 capitalize">
                      {user?.role}
                    </p>
                  </div>
                </button>

                <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {user?.role === "student" && (
                    <>
                      <Link
                        to="/student/dashboard"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/my-bookings"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        My Bookings
                      </Link>
                    </>
                  )}

                  {user?.role === "tutor" && (
                    <>
                      <Link
                        to="/tutor/dashboard"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/tutor/my-courses"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        My Courses
                      </Link>

                      <Link
                        to="/tutor/bookings"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        Manage Bookings
                      </Link>

                      <Link
                        to="/tutor/create-course"
                        className="block px-4 py-3 hover:bg-blue-50"
                      >
                        Create Course
                      </Link>
                    </>
                  )}

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
                    </>
                  )}

                  <hr />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
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

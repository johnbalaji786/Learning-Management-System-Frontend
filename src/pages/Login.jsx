import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../instances/instance";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await instance.post("/auth/login", formData, {
        withCredentials: true,
      });

      const user = response.data.user;

      dispatch(setUser(user));

      toast.success(response.data.message || "Login Successful");

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "tutor") {
        navigate("/tutor/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl font-bold leading-tight">Welcome Back 👋</h1>

          <p className="mt-6 text-lg text-blue-100">
            Continue your learning journey with professional tutors and live
            interactive lessons.
          </p>

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
            alt="Learning"
            className="mt-10 rounded-2xl shadow-2xl"
          />
        </div>

        {/* Right Side */}
        <div className="bg-white p-10 md:p-14">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Login</h2>

          <p className="text-gray-500 mb-8">Sign in to continue</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email Address
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-600">
                <FaEnvelope className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="ml-3 w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-600">
                <FaLock className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="ml-3 w-full outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              className="text-blue-600 ml-2 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

          <div className="mt-6 text-center">
            <Link to="/" className="text-blue-600 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

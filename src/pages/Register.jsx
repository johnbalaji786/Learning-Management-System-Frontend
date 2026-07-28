import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../services/authServices";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserTag,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
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

      const data = await registerUser(formData);

      toast.success(data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
        {/* Left */}
        <div className="hidden lg:flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl font-bold">Join LearnHub 🚀</h1>

          <p className="mt-6 text-lg text-blue-100">
            Learn from expert tutors, book live lessons and improve your skills.
          </p>

          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900"
            alt=""
            className="mt-10 rounded-2xl shadow-xl"
          />
        </div>

        {/* Right */}
        <div className="bg-white p-10 md:p-14">
          <h2 className="text-4xl font-bold text-gray-800">Create Account</h2>

          <p className="text-gray-500 mt-2 mb-8">Register to start learning.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center border rounded-xl px-4 py-3">
              <FaUser className="text-gray-400" />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="ml-3 w-full outline-none"
                required
              />
            </div>

            <div className="flex items-center border rounded-xl px-4 py-3">
              <FaEnvelope className="text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="ml-3 w-full outline-none"
                required
              />
            </div>

            <div className="flex items-center border rounded-xl px-4 py-3">
              <FaLock className="text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="ml-3 w-full outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex items-center border rounded-xl px-4 py-3">
              <FaUserTag className="text-gray-400" />

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="ml-3 w-full outline-none bg-transparent"
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-600 ml-2 font-semibold hover:underline"
            >
              Login
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

export default Register;

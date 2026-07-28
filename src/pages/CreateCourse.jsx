import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  BookOpen,
  FileText,
  GraduationCap,
  IndianRupee,
  Clock3,
  Sparkles,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { createCourse } from "../services/courseServices";

const CreateCourse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    price: "",
    duration: "",
    level: "beginner",
  });

  const [loading, setLoading] = useState(false);

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

      await createCourse(formData);

      toast.success("Course created successfully");

      navigate("/tutor/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-5xl mx-auto px-6">
          {/* Hero */}

          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-3xl p-10 shadow-2xl text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <Sparkles size={34} />
              </div>

              <div>
                <h1 className="text-4xl font-bold">Create New Course</h1>

                <p className="mt-2 text-blue-100 text-lg">
                  Publish a professional course and start teaching students.
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}

          <div className="bg-white rounded-3xl shadow-xl border mt-10 p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title */}

              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                  <BookOpen size={18} className="text-blue-600" />
                  Course Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter course title"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              {/* Description */}

              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                  <FileText size={18} className="text-indigo-600" />
                  Course Description
                </label>

                <textarea
                  rows="6"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your course..."
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              {/* Subject */}

              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                  <GraduationCap size={18} className="text-green-600" />
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="JavaScript, React, Node.js..."
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              {/* Price & Duration */}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <IndianRupee size={18} className="text-red-600" />
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="500"
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <Clock3 size={18} className="text-orange-500" />
                    Duration (Hours)
                  </label>

                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="20"
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Level */}

              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                  <GraduationCap size={18} className="text-purple-600" />
                  Course Level
                </label>

                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              {/* Submit Button */}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:via-indigo-700 hover:to-cyan-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Course...
                    </div>
                  ) : (
                    "🚀 Create Course"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;

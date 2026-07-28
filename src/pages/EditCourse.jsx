import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  BookOpen,
  FileText,
  GraduationCap,
  Clock,
  IndianRupee,
  Save,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { getCourseById, updateCourse } from "../services/courseServices";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    price: "",
    duration: "",
    level: "beginner",
  });

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const data = await getCourseById(id);

      setFormData({
        title: data.course.title,
        description: data.course.description,
        subject: data.course.subject,
        price: data.course.price,
        duration: data.course.duration,
        level: data.course.level,
      });
    } catch (error) {
      toast.error("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCourse(id, formData);

      toast.success("Course updated successfully");

      navigate("/tutor/my-courses");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update course");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex justify-center items-center bg-slate-50">
          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-xl p-8 text-white mb-8">
            <h1 className="text-4xl font-bold">Edit Course</h1>

            <p className="text-blue-100 mt-3">
              Update your course details and save changes.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Title */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
                  <BookOpen size={18} className="text-blue-600" />
                  Course Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Description */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
                  <FileText size={18} className="text-indigo-600" />
                  Description
                </label>

                <textarea
                  rows="5"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Subject */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
                  <GraduationCap size={18} className="text-green-600" />
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Price & Duration */}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
                    <IndianRupee size={18} className="text-red-500" />
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
                    <Clock size={18} className="text-orange-500" />
                    Duration (Hours)
                  </label>

                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Level */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
                  <GraduationCap size={18} className="text-purple-600" />
                  Course Level
                </label>

                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:via-indigo-700 hover:to-cyan-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Save size={22} />
                  Update Course
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCourse;

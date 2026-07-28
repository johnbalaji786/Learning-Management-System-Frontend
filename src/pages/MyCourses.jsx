import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  BookOpen,
  Plus,
  GraduationCap,
  IndianRupee,
  Clock3,
  Search,
} from "lucide-react";

import Navbar from "../components/Navbar";

import { getMyCourses, deleteCourse } from "../services/courseServices";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.subject.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredCourses(filtered);
  }, [search, courses]);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const data = await getMyCourses();

      setCourses(data.courses);
      setFilteredCourses(data.courses);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?",
    );

    if (!confirmDelete) return;

    try {
      await deleteCourse(id);

      toast.success("Course deleted successfully");

      fetchCourses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete course");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}

          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-3xl shadow-2xl p-10 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold">My Courses</h1>

                <p className="mt-3 text-blue-100 text-lg">
                  Manage all your published courses in one place.
                </p>
              </div>

              <Link
                to="/tutor/create-course"
                className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:scale-105 transition flex items-center gap-2 w-fit"
              >
                <Plus size={20} />
                Create Course
              </Link>
            </div>
          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <BookOpen className="text-blue-600 mb-3" size={36} />

              <p className="text-gray-500">Total Courses</p>

              <h2 className="text-3xl font-bold mt-2">{courses.length}</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <GraduationCap className="text-green-600 mb-3" size={36} />

              <p className="text-gray-500">Subjects</p>

              <h2 className="text-3xl font-bold mt-2">
                {new Set(courses.map((c) => c.subject)).size}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <IndianRupee className="text-purple-600 mb-3" size={36} />

              <p className="text-gray-500">Average Price</p>

              <h2 className="text-3xl font-bold mt-2">
                ₹
                {courses.length
                  ? Math.round(
                      courses.reduce((sum, c) => sum + Number(c.price), 0) /
                        courses.length,
                    )
                  : 0}
              </h2>
            </div>
          </div>

          {/* Search */}

          <div className="bg-white rounded-2xl shadow-lg border p-5 mt-8 flex items-center gap-3">
            <Search className="text-gray-500" />

            <input
              type="text"
              placeholder="Search your courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none"
            />
          </div>
          {/* Course Cards */}

          {filteredCourses.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl border p-16 text-center mt-8">
              <BookOpen size={70} className="mx-auto text-gray-300 mb-6" />

              <h2 className="text-3xl font-bold text-gray-800">
                No Courses Found
              </h2>

              <p className="text-gray-500 mt-3">
                {search
                  ? "Try a different search keyword."
                  : "Create your first course to start teaching students."}
              </p>

              {!search && (
                <Link
                  to="/tutor/create-course"
                  className="inline-flex items-center gap-2 mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
                >
                  <Plus size={20} />
                  Create Course
                </Link>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-3xl shadow-lg border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                  {/* Top */}

                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                    <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm capitalize">
                      {course.level}
                    </span>

                    <h2 className="text-2xl font-bold mt-4 line-clamp-2">
                      {course.title}
                    </h2>

                    <p className="text-blue-100 mt-3 line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* Details */}

                  <div className="p-6 space-y-5">
                    <div className="flex items-center gap-3">
                      <GraduationCap size={20} className="text-green-600" />

                      <div>
                        <p className="text-xs text-gray-500">Subject</p>

                        <p className="font-semibold">{course.subject}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock3 size={20} className="text-orange-500" />

                      <div>
                        <p className="text-xs text-gray-500">Duration</p>

                        <p className="font-semibold">{course.duration} Hours</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <IndianRupee size={20} className="text-purple-600" />

                      <div>
                        <p className="text-xs text-gray-500">Price</p>

                        <p className="text-2xl font-bold text-blue-600">
                          ₹{course.price}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}

                    <div className="grid grid-cols-2 gap-3 pt-3">
                      <Link
                        to={`/tutor/edit-course/${course._id}`}
                        className="text-center bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold transition"
                      >
                        ✏️ Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(course._id)}
                        className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCourses;

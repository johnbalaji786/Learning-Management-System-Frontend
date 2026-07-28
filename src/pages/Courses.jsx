import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import { getAllCourses } from "../services/courseServices";
import { toast } from "react-toastify";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const response = await getAllCourses();

      setCourses(response.courses);
      setFilteredCourses(response.courses);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredCourses(filtered);
  }, [search, courses]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <span className="text-blue-600 font-semibold uppercase tracking-widest">
                LearnHub Courses
              </span>

              <h1 className="text-5xl font-extrabold text-gray-900 mt-2">
                Explore Courses
              </h1>

              <p className="text-gray-500 mt-3 text-lg">
                Discover high quality courses taught by expert tutors.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 rounded-2xl border border-gray-300 bg-white px-5 py-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">
              No Courses Found
            </h2>

            <p className="text-gray-500 mt-2">Try another search keyword.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Courses;

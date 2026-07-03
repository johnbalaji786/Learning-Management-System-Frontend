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

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Explore Courses
            </h1>

            <p className="text-gray-500 mt-2">Learn from experienced tutors.</p>
          </div>

          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">
              No Courses Found
            </h2>

            <p className="text-gray-500 mt-2">Try another search keyword.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
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

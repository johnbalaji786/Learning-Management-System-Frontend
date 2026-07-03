import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { getMyCourses } from "../services/courseServices";
import { deleteCourse } from "../services/courseServices";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getMyCourses();
      setCourses(data.courses);
    } catch (error) {
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-20 text-lg">Loading...</div>
      </>
    );
  }
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

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Courses</h1>

          <Link
            to="/tutor/create-course"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            + Create Course
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold">No Courses Found</h2>

            <p className="text-gray-500 mt-2">Create your first course.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold">{course.title}</h2>

                <p className="text-gray-500 mt-2">{course.subject}</p>

                <p className="mt-2">
                  <strong>Duration:</strong> {course.duration} Hours
                </p>

                <p className="mt-2">
                  <strong>Level:</strong>{" "}
                  <span className="capitalize">{course.level}</span>
                </p>

                <p className="text-blue-600 font-bold text-2xl mt-3">
                  ₹{course.price}
                </p>

                <div className="flex gap-3 mt-6">
                  <Link
                    to={`/tutor/edit-course/${course._id}`}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-center py-2 rounded-lg"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(course._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyCourses;

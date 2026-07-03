import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { getCourseById } from "../services/courseServices";

const CourseDetails = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data.course);
      } catch (error) {
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-20">Course not found.</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl shadow-md p-8">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full capitalize text-sm">
            {course.level}
          </span>

          <h1 className="text-4xl font-bold mt-4">{course.title}</h1>

          <p className="text-gray-600 mt-4">{course.description}</p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div>
              <h3 className="font-semibold">Subject</h3>
              <p>{course.subject}</p>
            </div>

            <div>
              <h3 className="font-semibold">Duration</h3>
              <p>{course.duration} Hours</p>
            </div>

            <div>
              <h3 className="font-semibold">Tutor</h3>
              <p>{course.tutor?.name}</p>
            </div>

            <div>
              <h3 className="font-semibold">Price</h3>
              <p className="text-blue-600 font-bold text-2xl">
                ₹{course.price}
              </p>
            </div>
          </div>

          <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
            Book Lesson
          </button>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;

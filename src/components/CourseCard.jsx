
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">

      {/* Course Image */}
      <div className="relative overflow-hidden">
        <img
          src={
            course.thumbnail ||
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
          }
          alt={course.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
        />

        <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold capitalize">
          {course.level}
        </span>

        <span className="absolute top-4 right-4 bg-white text-yellow-500 px-2 py-1 rounded-full shadow">
          ⭐ 4.8
        </span>
      </div>

      {/* Content */}
      <div className="p-6">

        <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition">
          {course.title}
        </h2>

        <p className="text-gray-500 mt-3 line-clamp-2">
          {course.description}
        </p>

        <div className="mt-5 space-y-2 text-gray-600 text-sm">

          <p>
            📚 <span className="font-semibold">Subject:</span>{" "}
            {course.subject}
          </p>

          <p>
            ⏱ <span className="font-semibold">Duration:</span>{" "}
            {course.duration} Hours
          </p>

          <p>
            👨‍🏫 <span className="font-semibold">Tutor:</span>{" "}
            {course.tutor?.name || "Unknown"}
          </p>

        </div>

        <div className="flex justify-between items-center mt-8">

          <div>
            <p className="text-gray-400 text-sm">
              Course Fee
            </p>

            <h2 className="text-3xl font-bold text-blue-600">
              ₹{course.price}
            </h2>
          </div>

          <Link
            to={`/courses/${course._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition hover:scale-105"
          >
            View Details →
          </Link>

        </div>

      </div>

    </div>
  );
};

export default CourseCard;


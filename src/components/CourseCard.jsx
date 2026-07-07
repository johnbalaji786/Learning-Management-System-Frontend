import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100">
      {/* Course Thumbnail */}
      {/* <img
        src={
          course.thumbnail ||
          "https://placehold.co/600x350?text=Course+Thumbnail"
        }
        alt={course.title}
        className="w-full h-52 object-cover"
      /> */}

      {/* Content */}
      <div className="p-5">
        {/* Level Badge */}
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
          {course.level}
        </span>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mt-3">{course.title}</h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {course.description}
        </p>

        {/* Details */}
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-semibold">📚 Subject:</span> {course.subject}
          </p>

          <p>
            <span className="font-semibold">⏱ Duration:</span> {course.duration}{" "}
            Hours
          </p>

          <p>
            <span className="font-semibold">👨‍🏫 Tutor:</span>{" "}
            {course.tutor?.name || "Unknown"}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6">
          <span className="text-2xl font-bold text-blue-600">
            ₹{course.price}
          </span>

          <Link
            to={`/courses/${course._id}`}
            className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

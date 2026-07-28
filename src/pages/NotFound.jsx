import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6">
      <div className="text-center max-w-lg">
        <FaExclamationTriangle className="mx-auto text-yellow-500" size={90} />

        <h1 className="text-7xl font-extrabold text-gray-800 mt-6">404</h1>

        <h2 className="text-3xl font-bold mt-3 text-gray-700">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

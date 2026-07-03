import { useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";

const TutorDashboard = () => {
  const { user } = useLoaderData();

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>

        <p className="text-gray-500 mb-6">Tutor Dashboard</p>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-600 font-medium">Total Courses</h2>
            <p className="text-3xl font-bold text-blue-600 mt-3">0</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-600 font-medium">Bookings</h2>
            <p className="text-3xl font-bold text-green-600 mt-3">0</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-600 font-medium">Earnings</h2>
            <p className="text-3xl font-bold text-purple-600 mt-3">₹0</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-600 font-medium">Reviews</h2>
            <p className="text-3xl font-bold text-yellow-500 mt-3">0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorDashboard;

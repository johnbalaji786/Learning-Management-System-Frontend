import { useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTutorDashboard } from "../services/tutorServices";

const TutorDashboard = () => {
  const { user } = useLoaderData();

  const [stats, setStats] = useState({
    totalCourses: 0,
    totalBookings: 0,
    totalEarnings: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getTutorDashboard();
      console.log(data);
      setStats({
        totalCourses: data.totalCourses,
        totalBookings: data.totalBookings,
        totalEarnings: data.totalEarnings,
        totalReviews: data.totalReviews,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>

        <p className="text-gray-500 mb-6">Tutor Dashboard</p>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-600 font-medium">Total Courses</h2>
            <p className="text-3xl font-bold text-blue-600 mt-3">
              {stats.totalCourses}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-600 font-medium">Bookings</h2>
            <p className="text-3xl font-bold text-green-600 mt-3">
              {stats.totalBookings}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-600 font-medium">Earnings</h2>
            <p className="text-3xl font-bold text-purple-600 mt-3">
              ₹{stats.totalEarnings}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-600 font-medium">Reviews</h2>
            <p className="text-3xl font-bold text-yellow-500 mt-3">
              {stats.totalReviews}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorDashboard;

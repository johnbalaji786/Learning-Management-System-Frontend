import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getStudentDashboard } from "../services/userServices";

const StudentDashboard = () => {
  const { user } = useLoaderData();

  const [stats, setStats] = useState({
    totalBookings: 0,
    totalPayments: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getStudentDashboard();
      setStats(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>

        <p className="text-gray-500 mb-6">Student Dashboard</p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold">My Bookings</h2>

            <p className="text-2xl font-bold mt-2 text-blue-600">
              {stats.totalBookings}
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold">Payments</h2>

            <p className="text-2xl font-bold mt-2 text-green-600">
              {stats.totalPayments}
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold">Reviews Given</h2>

            <p className="text-2xl font-bold mt-2 text-purple-600">
              {stats.totalReviews}
            </p>
          </div>
        </div>

        <Link
          to="/my-bookings"
          className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          View My Bookings
        </Link>
      </div>
    </>
  );
};

export default StudentDashboard;

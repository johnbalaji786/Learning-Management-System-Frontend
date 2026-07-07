import { useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/adminServices";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { user } = useLoaderData();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTutors: 0,
    totalCourses: 0,
    totalBookings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();

        setStats(data);
      } catch (error) {
        toast.error("Failed to load dashboard");
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>

        <p className="text-gray-500 mb-6">Admin Dashboard</p>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-600 font-medium">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600 mt-3">
              {stats.totalUsers}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-600 font-medium">Total Tutors</h2>
            <p className="text-3xl font-bold text-green-600 mt-3">
              {stats.totalTutors}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-600 font-medium">Total Courses</h2>
            <p className="text-3xl font-bold text-purple-600 mt-3">
              {stats.totalCourses}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-600 font-medium">Total Bookings</h2>
            <p className="text-3xl font-bold text-orange-500 mt-3">
              {stats.totalBookings}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

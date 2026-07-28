import { useLoaderData, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  BookOpen,
  CalendarDays,
  Shield,
  FolderOpen,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { getDashboardStats } from "../services/adminServices";

const AdminDashboard = () => {
  const { user } = useLoaderData();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTutors: 0,
    totalCourses: 0,
    totalBookings: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      toast.error("Failed to load dashboard");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}

          <div className="bg-gradient-to-r from-slate-800 to-blue-700 rounded-3xl shadow-xl p-10 text-white mb-10">
            <h1 className="text-4xl font-bold">Welcome, {user.name} 🛡️</h1>

            <p className="mt-3 text-blue-100 text-lg">
              Monitor users, tutors, courses and platform activities from one
              place.
            </p>
          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div whileHover={{ y: -6 }}>
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <Users size={40} className="text-blue-600 mb-4" />
                <h2 className="text-gray-500 font-medium">Total Users</h2>
                <p className="text-4xl font-bold text-blue-600 mt-2">
                  {stats.totalUsers}
                </p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -6 }}>
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <GraduationCap size={40} className="text-green-600 mb-4" />
                <h2 className="text-gray-500 font-medium">Total Tutors</h2>
                <p className="text-4xl font-bold text-green-600 mt-2">
                  {stats.totalTutors}
                </p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -6 }}>
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <BookOpen size={40} className="text-purple-600 mb-4" />
                <h2 className="text-gray-500 font-medium">Total Courses</h2>
                <p className="text-4xl font-bold text-purple-600 mt-2">
                  {stats.totalCourses}
                </p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -6 }}>
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <CalendarDays size={40} className="text-orange-500 mb-4" />
                <h2 className="text-gray-500 font-medium">Total Bookings</h2>
                <p className="text-4xl font-bold text-orange-500 mt-2">
                  {stats.totalBookings}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-2xl shadow-lg border p-8 mt-10">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Link
                to="/users"
                className="flex items-center gap-5 bg-blue-50 hover:bg-blue-100 rounded-2xl p-6 transition"
              >
                <Shield size={35} className="text-blue-600" />

                <div>
                  <h3 className="font-semibold text-lg">Manage Users</h3>

                  <p className="text-gray-500 text-sm">
                    View and manage all users.
                  </p>
                </div>
              </Link>

              <Link
                to="/courses"
                className="flex items-center gap-5 bg-green-50 hover:bg-green-100 rounded-2xl p-6 transition"
              >
                <FolderOpen size={35} className="text-green-600" />

                <div>
                  <h3 className="font-semibold text-lg">Manage Courses</h3>

                  <p className="text-gray-500 text-sm">
                    View and manage all courses.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

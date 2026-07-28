import { useLoaderData, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  IndianRupee,
  Star,
  PlusCircle,
  FolderOpen,
  ClipboardList,
} from "lucide-react";

import Navbar from "../components/Navbar";
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

      <div className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}

          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl shadow-xl p-10 text-white mb-10">
            <h1 className="text-4xl font-bold">Welcome, {user.name} 👨‍🏫</h1>

            <p className="mt-3 text-blue-100 text-lg">
              Manage your courses, bookings and grow your teaching business.
            </p>
          </div>

          {/* Statistics */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div whileHover={{ y: -6 }}>
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <BookOpen size={40} className="text-blue-600 mb-4" />

                <h2 className="text-gray-500 font-medium">Total Courses</h2>

                <p className="text-4xl font-bold text-blue-600 mt-2">
                  {stats.totalCourses}
                </p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -6 }}>
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <CalendarDays size={40} className="text-green-600 mb-4" />

                <h2 className="text-gray-500 font-medium">Bookings</h2>

                <p className="text-4xl font-bold text-green-600 mt-2">
                  {stats.totalBookings}
                </p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -6 }}>
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <IndianRupee size={40} className="text-purple-600 mb-4" />

                <h2 className="text-gray-500 font-medium">Earnings</h2>

                <p className="text-4xl font-bold text-purple-600 mt-2">
                  ₹{stats.totalEarnings}
                </p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -6 }}>
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <Star size={40} className="text-yellow-500 mb-4" />

                <h2 className="text-gray-500 font-medium">Reviews</h2>

                <p className="text-4xl font-bold text-yellow-500 mt-2">
                  {stats.totalReviews}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-2xl shadow-lg border p-8 mt-10">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Link
                to="/tutor/create-course"
                className="flex items-center gap-4 bg-blue-50 hover:bg-blue-100 transition rounded-2xl p-6"
              >
                <PlusCircle size={34} className="text-blue-600" />

                <div>
                  <h3 className="font-semibold">Create Course</h3>

                  <p className="text-gray-500 text-sm">Publish a new course.</p>
                </div>
              </Link>

              <Link
                to="/tutor/my-courses"
                className="flex items-center gap-4 bg-green-50 hover:bg-green-100 transition rounded-2xl p-6"
              >
                <FolderOpen size={34} className="text-green-600" />

                <div>
                  <h3 className="font-semibold">My Courses</h3>

                  <p className="text-gray-500 text-sm">
                    Edit or manage courses.
                  </p>
                </div>
              </Link>

              <Link
                to="/tutor/bookings"
                className="flex items-center gap-4 bg-purple-50 hover:bg-purple-100 transition rounded-2xl p-6"
              >
                <ClipboardList size={34} className="text-purple-600" />

                <div>
                  <h3 className="font-semibold">Manage Bookings</h3>

                  <p className="text-gray-500 text-sm">
                    Confirm and manage lessons.
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

export default TutorDashboard;

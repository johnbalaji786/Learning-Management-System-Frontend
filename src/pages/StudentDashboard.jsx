import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { BookOpen, CreditCard, Star, Calendar, Search } from "lucide-react";

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

      <div className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-xl p-10 text-white mb-10">
            <h1 className="text-4xl font-bold">Welcome, {user.name} 👋</h1>

            <p className="mt-3 text-blue-100 text-lg">
              Manage your learning journey, bookings and payments from one
              place.
            </p>
          </div>

          {/* Statistics */}

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -6 }}>
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <BookOpen size={40} className="text-blue-600 mb-5" />

                <h2 className="text-gray-500 font-medium">My Bookings</h2>

                <p className="text-4xl font-bold text-blue-600 mt-2">
                  {stats.totalBookings}
                </p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -6 }}>
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <CreditCard size={40} className="text-green-600 mb-5" />

                <h2 className="text-gray-500 font-medium">Total Payments</h2>

                <p className="text-4xl font-bold text-green-600 mt-2">
                  {stats.totalPayments}
                </p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -6 }}>
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <Star size={40} className="text-yellow-500 mb-5" />

                <h2 className="text-gray-500 font-medium">Reviews Given</h2>

                <p className="text-4xl font-bold text-yellow-500 mt-2">
                  {stats.totalReviews}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-2xl shadow-lg border p-8 mt-10">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Link
                to="/courses"
                className="flex items-center gap-5 bg-blue-50 hover:bg-blue-100 transition duration-300 rounded-2xl p-6"
              >
                <Search size={35} className="text-blue-600" />

                <div>
                  <h3 className="font-semibold text-lg">Browse Courses</h3>

                  <p className="text-gray-500 text-sm">
                    Discover new courses from expert tutors.
                  </p>
                </div>
              </Link>

              <Link
                to="/my-bookings"
                className="flex items-center gap-5 bg-green-50 hover:bg-green-100 transition duration-300 rounded-2xl p-6"
              >
                <Calendar size={35} className="text-green-600" />

                <div>
                  <h3 className="font-semibold text-lg">My Bookings</h3>

                  <p className="text-gray-500 text-sm">
                    View and manage your booked lessons.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom CTA */}

          <div className="mt-10 text-center">
            <Link
              to="/courses"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition duration-300 text-white font-semibold px-8 py-4 rounded-xl shadow-lg"
            >
              Explore More Courses
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;

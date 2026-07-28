import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  BookOpen,
  IndianRupee,
  Video,
  PlayCircle,
  CreditCard,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { getMyBookings } from "../services/bookingServices";
import { makePayment } from "../services/paymentServices";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const data = await getMyBookings();

      setBookings(data.bookings);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (bookingId) => {
    try {
      await makePayment(bookingId);

      toast.success("Payment Successful");

      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment Failed");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl mb-10">
            <h1 className="text-4xl font-bold">My Bookings</h1>

            <p className="mt-3 text-blue-100 text-lg">
              Manage your booked lessons, payments and live classes.
            </p>

            <Link
              to="/courses"
              className="inline-block mt-6 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:scale-105 transition"
            >
              Browse More Courses
            </Link>
          </div>
          {bookings.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-16 text-center border">
              <BookOpen size={70} className="mx-auto text-blue-500 mb-6" />

              <h2 className="text-3xl font-bold text-gray-800">
                No Bookings Yet
              </h2>

              <p className="text-gray-500 mt-3">
                Start learning by booking your first course.
              </p>

              <Link
                to="/courses"
                className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
              >
                Explore Courses
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {bookings.map((booking) => (
                <motion.div
                  key={booking._id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-3xl shadow-lg border overflow-hidden"
                >
                  {/* Header */}

                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 bg-gray-50 p-6 border-b">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {booking.course?.title}
                      </h2>

                      <p className="text-gray-500 mt-2">
                        {booking.course?.description}
                      </p>
                    </div>

                    <span
                      className={`px-5 py-2 rounded-full text-sm font-semibold w-fit ${getStatusColor(
                        booking.status,
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* Details */}

                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Left */}

                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <User className="text-blue-600" />

                        <div>
                          <p className="text-gray-500 text-sm">Tutor</p>

                          <p className="font-semibold">{booking.tutor?.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <BookOpen className="text-green-600" />

                        <div>
                          <p className="text-gray-500 text-sm">Subject</p>

                          <p className="font-semibold">
                            {booking.course?.subject}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <IndianRupee className="text-purple-600" />

                        <div>
                          <p className="text-gray-500 text-sm">Course Fee</p>

                          <p className="text-2xl font-bold text-purple-600">
                            ₹{booking.amount}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right */}

                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <Calendar className="text-orange-500" />

                        <div>
                          <p className="text-gray-500 text-sm">Booking Date</p>

                          <p className="font-semibold">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Clock className="text-red-500" />

                        <div>
                          <p className="text-gray-500 text-sm">Time</p>

                          <p className="font-semibold">
                            {booking.startTime} - {booking.endTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <CreditCard className="text-emerald-600" />

                        <div>
                          <p className="text-gray-500 text-sm">
                            Payment Status
                          </p>

                          <p
                            className={`font-bold ${
                              booking.paymentStatus === "paid"
                                ? "text-green-600"
                                : "text-orange-500"
                            }`}
                          >
                            {booking.paymentStatus}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}

                  <div className="px-8 pb-8 flex flex-wrap gap-4">
                    {booking.paymentStatus !== "paid" && (
                      <button
                        onClick={() => handlePayment(booking._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                      >
                        Pay Now
                      </button>
                    )}

                    {booking.meetingLink && (
                      <a
                        href={booking.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                      >
                        <Video size={18} />
                        Join Meeting
                      </a>
                    )}

                    {booking.lessonRecording && (
                      <a
                        href={booking.lessonRecording}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                      >
                        <PlayCircle size={18} />
                        Watch Recording
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyBookings;

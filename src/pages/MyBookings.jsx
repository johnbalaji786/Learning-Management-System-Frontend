import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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

      // Refresh bookings
      fetchBookings();
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Payment Failed");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Bookings</h1>

          <Link
            to="/courses"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Browse Courses
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold">No Bookings Found</h2>

            <p className="text-gray-500 mt-3">
              You haven't booked any lessons yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {booking.course?.title}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {booking.course?.description}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold
                      ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : booking.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <p>
                      <strong>Tutor :</strong> {booking.tutor?.name}
                    </p>

                    <p className="mt-2">
                      <strong>Subject :</strong> {booking.course?.subject}
                    </p>

                    <p className="mt-2">
                      <strong>Price :</strong> ₹{booking.amount}
                    </p>
                  </div>

                  <div>
                    <p>
                      <strong>Date :</strong>{" "}
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>

                    <p className="mt-2">
                      <strong>Time :</strong> {booking.startTime} -{" "}
                      {booking.endTime}
                    </p>

                    <p className="mt-2">
                      <strong>Payment :</strong>{" "}
                      <span
                        className={`font-semibold ${
                          booking.paymentStatus === "paid"
                            ? "text-green-600"
                            : "text-orange-500"
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </p>
                    {booking.paymentStatus !== "paid" && (
                      <button
                        onClick={() => handlePayment(booking._id)}
                        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                      >
                        Pay Now
                      </button>
                    )}
                    {booking.lessonRecording && (
                      <a
                        href={booking.lessonRecording}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg inline-block mt-3"
                      >
                        Watch Recording
                      </a>
                    )}
                  </div>
                </div>

                {booking.meetingLink && (
                  <div className="mt-6">
                    <a
                      href={booking.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                    >
                      Join Meeting
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookings;

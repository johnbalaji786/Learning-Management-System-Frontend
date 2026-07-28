import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

import {
  getTutorBookings,
  updateBookingStatus,
  addMeetingLink,
  addLessonRecording,
} from "../services/bookingServices";

import {
  CalendarDays,
  Clock,
  User,
  IndianRupee,
  Video,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

const TutorBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [meetingLinks, setMeetingLinks] = useState({});
  const [recordings, setRecordings] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const data = await getTutorBookings();

      setBookings(data.bookings);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, { status });

      toast.success("Booking updated successfully");

      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const handleMeetingChange = (bookingId, value) => {
    setMeetingLinks((prev) => ({
      ...prev,
      [bookingId]: value,
    }));
  };

  const handleAddMeeting = async (bookingId) => {
    try {
      await addMeetingLink(bookingId, meetingLinks[bookingId]);

      toast.success("Meeting link saved");

      fetchBookings();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save meeting link",
      );
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex justify-center items-center bg-slate-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        </div>
      </>
    );
  }

  const confirmedCount = bookings.filter(
    (b) => b.status === "confirmed",
  ).length;

  const completedCount = bookings.filter(
    (b) => b.status === "completed",
  ).length;

  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}

          <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl p-10 text-white shadow-xl">
            <h1 className="text-4xl font-bold">Tutor Bookings</h1>

            <p className="mt-3 text-blue-100 text-lg">
              Manage student bookings, meeting links and lesson recordings.
            </p>
          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-4 gap-6 mt-10">
            <div className="bg-white rounded-2xl shadow-lg p-6 border">
              <BookOpen className="text-blue-600 mb-3" size={32} />

              <p className="text-gray-500">Total Bookings</p>

              <h2 className="text-3xl font-bold mt-2">{bookings.length}</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border">
              <CheckCircle2 className="text-green-600 mb-3" size={32} />

              <p className="text-gray-500">Confirmed</p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {confirmedCount}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border">
              <CalendarDays className="text-orange-500 mb-3" size={32} />

              <p className="text-gray-500">Pending</p>

              <h2 className="text-3xl font-bold text-orange-500 mt-2">
                {pendingCount}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border">
              <Video className="text-purple-600 mb-3" size={32} />

              <p className="text-gray-500">Completed</p>

              <h2 className="text-3xl font-bold text-purple-600 mt-2">
                {completedCount}
              </h2>
            </div>
          </div>

          {/* Booking Cards */}

          <div className="space-y-8 mt-10">
            {bookings.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center border">
                <BookOpen className="mx-auto text-blue-500 mb-4" size={60} />

                <h2 className="text-3xl font-bold text-gray-800">
                  No Bookings Yet
                </h2>

                <p className="text-gray-500 mt-3">
                  Students haven't booked any of your courses yet.
                </p>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-3xl shadow-lg border overflow-hidden hover:shadow-2xl transition duration-300"
                >
                  {/* Card Header */}

                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {booking.course?.title}
                      </h2>

                      <p className="text-blue-100 mt-2">
                        {booking.course?.subject}
                      </p>
                    </div>

                    <span
                      className={`px-5 py-2 rounded-full text-sm font-semibold
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

                  {/* Card Body */}

                  <div className="grid lg:grid-cols-2 gap-10 p-8">
                    {/* Left */}

                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                          {booking.student?.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className="text-gray-500 text-sm">Student</p>

                          <h3 className="font-semibold text-lg">
                            {booking.student?.name}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <CalendarDays className="text-blue-600" />

                        <div>
                          <p className="text-gray-500 text-sm">Booking Date</p>

                          <p className="font-semibold">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Clock className="text-orange-500" />

                        <div>
                          <p className="text-gray-500 text-sm">Time</p>

                          <p className="font-semibold">
                            {booking.startTime} - {booking.endTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <IndianRupee className="text-green-600" />

                        <div>
                          <p className="text-gray-500 text-sm">Amount</p>

                          <p className="text-2xl font-bold text-green-600">
                            ₹{booking.amount}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <User className="text-purple-600" />

                        <div>
                          <p className="text-gray-500 text-sm">
                            Payment Status
                          </p>

                          <p
                            className={`font-semibold ${
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

                    {/* Right */}
                    <div className="space-y-6">
                      {/* Meeting Link */}

                      <div>
                        <label className="font-semibold text-gray-700 block mb-2">
                          Google Meet Link
                        </label>

                        <input
                          type="text"
                          placeholder="Paste Google Meet Link"
                          value={
                            meetingLinks[booking._id] ||
                            booking.meetingLink ||
                            ""
                          }
                          onChange={(e) =>
                            handleMeetingChange(booking._id, e.target.value)
                          }
                          className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                          onClick={() => handleAddMeeting(booking._id)}
                          className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition"
                        >
                          Save Meeting Link
                        </button>

                        {booking.meetingLink && (
                          <a
                            href={booking.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block mt-3 text-blue-600 hover:underline font-medium"
                          >
                            Join Meeting →
                          </a>
                        )}
                      </div>

                      {/* Recording */}

                      <div>
                        <label className="font-semibold text-gray-700 block mb-2">
                          Lesson Recording
                        </label>

                        <input
                          type="text"
                          placeholder="Recording URL"
                          value={recordings[booking._id] || ""}
                          onChange={(e) =>
                            setRecordings({
                              ...recordings,
                              [booking._id]: e.target.value,
                            })
                          }
                          className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                          onClick={async () => {
                            try {
                              await addLessonRecording(booking._id, {
                                recording: recordings[booking._id],
                              });

                              toast.success("Recording added successfully");

                              fetchBookings();
                            } catch (error) {
                              toast.error(
                                error.response?.data?.message ||
                                  "Failed to save recording",
                              );
                            }
                          }}
                          className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition"
                        >
                          Save Recording
                        </button>

                        {booking.lessonRecording && (
                          <a
                            href={booking.lessonRecording}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block mt-3 text-indigo-600 hover:underline font-medium"
                          >
                            View Recording →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer Buttons */}

                  <div className="border-t bg-gray-50 px-8 py-5 flex flex-wrap gap-4">
                    <button
                      onClick={() =>
                        handleStatusUpdate(booking._id, "confirmed")
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition"
                    >
                      ✅ Confirm
                    </button>

                    <button
                      onClick={() =>
                        handleStatusUpdate(booking._id, "completed")
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
                    >
                      🎓 Complete
                    </button>

                    <button
                      onClick={() =>
                        handleStatusUpdate(booking._id, "cancelled")
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorBookings;

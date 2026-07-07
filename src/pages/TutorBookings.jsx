import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import {
  getTutorBookings,
  updateBookingStatus,
  addMeetingLink,
  addLessonRecording,
} from "../services/bookingServices";

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
    setMeetingLinks({
      ...meetingLinks,
      [bookingId]: value,
    });
  };

  const handleAddMeeting = async (bookingId) => {
    try {
      await addMeetingLink(bookingId, meetingLinks[bookingId]);

      toast.success("Meeting link added successfully");

      fetchBookings();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add meeting link",
      );
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
        <h1 className="text-3xl font-bold mb-8">Tutor Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold">No Bookings Yet</h2>

            <p className="text-gray-500 mt-2">
              Students haven't booked your courses.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {booking.course?.title}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Student : {booking.student?.name}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold
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
                      <strong>Date :</strong>{" "}
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>

                    <p className="mt-2">
                      <strong>Time :</strong> {booking.startTime} -{" "}
                      {booking.endTime}
                    </p>

                    <p className="mt-2">
                      <strong>Amount :</strong> ₹{booking.amount}
                    </p>
                  </div>

                  <div>
                    <p>
                      <strong>Payment :</strong> {booking.paymentStatus}
                    </p>

                    <input
                      type="text"
                      placeholder="Paste Google Meet Link"
                      value={
                        meetingLinks[booking._id] || booking.meetingLink || ""
                      }
                      onChange={(e) =>
                        handleMeetingChange(booking._id, e.target.value)
                      }
                      className="border rounded-lg p-2 w-full mt-3"
                    />

                    <button
                      onClick={() => handleAddMeeting(booking._id)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg mt-3 hover:bg-purple-700"
                    >
                      Save Meeting Link
                    </button>

                    {booking.meetingLink && (
                      <a
                        href={booking.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-blue-600 underline mt-3"
                      >
                        Join Meeting
                      </a>
                    )}
                    <div className="mt-4">
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
                        className="border p-2 rounded-lg w-full"
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
                        className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
                      >
                        Save Recording
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handleStatusUpdate(booking._id, "confirmed")}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(booking._id, "completed")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(booking._id, "cancelled")}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TutorBookings;

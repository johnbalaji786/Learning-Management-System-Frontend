import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  BookOpen,
  GraduationCap,
  Clock,
  IndianRupee,
  User,
  Calendar,
} from "lucide-react";

import Navbar from "../components/Navbar";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

import { getCourseById } from "../services/courseServices";
import { createBooking } from "../services/bookingServices";

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({
    bookingDate: "",
    startTime: "",
    endTime: "",
  });

  const [refreshReviews, setRefreshReviews] = useState(false);

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    try {
      const response = await getCourseById(id);
      setCourse(response.course);
    } catch (error) {
      toast.error(error.response?.data?.message || "Course not found");
    }
  };

  const reloadReviews = () => {
    setRefreshReviews((prev) => !prev);
  };

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };
  const handleBooking = async () => {
    try {
      await createBooking(id, bookingData);

      toast.success("Lesson booked successfully");

      setTimeout(() => {
        navigate("/my-bookings");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Course Banner */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">
            <h1 className="text-4xl font-bold">{course.title}</h1>

            <p className="mt-4 text-blue-100 text-lg max-w-3xl">
              {course.description}
            </p>
          </div>

          {/* Course Information */}

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-white rounded-2xl shadow-lg p-6 border">
              <h2 className="text-2xl font-bold mb-6">Course Information</h2>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <BookOpen className="text-blue-600" />
                  <div>
                    <p className="text-gray-500 text-sm">Subject</p>
                    <p className="font-semibold">{course.subject}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <GraduationCap className="text-green-600" />
                  <div>
                    <p className="text-gray-500 text-sm">Level</p>
                    <p className="font-semibold capitalize">{course.level}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Clock className="text-orange-500" />
                  <div>
                    <p className="text-gray-500 text-sm">Duration</p>
                    <p className="font-semibold">{course.duration} Hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <IndianRupee className="text-red-500" />
                  <div>
                    <p className="text-gray-500 text-sm">Price</p>
                    <p className="font-semibold text-2xl text-blue-600">
                      ₹{course.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <User className="text-purple-600" />
                  <div>
                    <p className="text-gray-500 text-sm">Tutor</p>
                    <p className="font-semibold">{course.tutor?.name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Card */}

            {user?.role === "student" && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="text-blue-600" />
                  <h2 className="text-2xl font-bold">Book Lesson</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block mb-2 font-semibold">
                      Booking Date
                    </label>

                    <input
                      type="date"
                      name="bookingDate"
                      value={bookingData.bookingDate}
                      onChange={handleChange}
                      className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold">
                      Start Time
                    </label>

                    <input
                      type="time"
                      name="startTime"
                      value={bookingData.startTime}
                      onChange={handleChange}
                      className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold">End Time</label>

                    <input
                      type="time"
                      name="endTime"
                      value={bookingData.endTime}
                      onChange={handleChange}
                      className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    onClick={handleBooking}
                    className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-all duration-300 text-white py-4 rounded-xl font-semibold shadow-lg"
                  >
                    Book Lesson
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reviews */}

          <div className="bg-white rounded-2xl shadow-lg p-8 mt-10 border">
            <ReviewForm courseId={course._id} refreshReviews={reloadReviews} />

            <div className="mt-8">
              <ReviewList courseId={course._id} refresh={refreshReviews} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;

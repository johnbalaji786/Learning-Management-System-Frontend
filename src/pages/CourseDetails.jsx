import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

import { getCourseById } from "../services/courseServices";
import { createBooking } from "../services/bookingServices";

import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const CourseDetails = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);

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
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-20">Loading...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto mt-10 mb-10">
        <div className="bg-white rounded-xl shadow p-8">
          <h1 className="text-4xl font-bold">{course.title}</h1>

          <p className="text-gray-500 mt-3">{course.description}</p>

          <div className="mt-6 space-y-2">
            <p>
              <strong>Subject :</strong> {course.subject}
            </p>

            <p>
              <strong>Level :</strong> {course.level}
            </p>

            <p>
              <strong>Duration :</strong> {course.duration} Hours
            </p>

            <p>
              <strong>Price :</strong> ₹{course.price}
            </p>

            <p>
              <strong>Tutor :</strong> {course.tutor?.name}
            </p>
          </div>

          <hr className="my-8" />

          <h2 className="text-2xl font-semibold mb-5">Book Lesson</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="date"
              name="bookingDate"
              value={bookingData.bookingDate}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="time"
              name="startTime"
              value={bookingData.startTime}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="time"
              name="endTime"
              value={bookingData.endTime}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />
          </div>

          <button
            onClick={handleBooking}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Book Lesson
          </button>

          <hr className="my-10" />

          <ReviewForm courseId={course._id} refreshReviews={reloadReviews} />

          <ReviewList courseId={course._id} refresh={refreshReviews} />
        </div>
      </div>
    </>
  );
};

export default CourseDetails;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { getAllTutors } from "../services/userServices";

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const data = await getAllTutors();
      setTutors(data.tutors);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load tutors");
    } finally {
      setLoading(false);
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
        <h1 className="text-3xl font-bold mb-8">Our Tutors</h1>

        {tutors.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold">No Tutors Found</h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-center">
                  <img
                    src={
                      tutor.profileImage ||
                      "https://ui-avatars.com/api/?name=" + tutor.name
                    }
                    alt={tutor.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>

                <h2 className="text-xl font-bold text-center mt-4">
                  {tutor.name}
                </h2>

                <p className="text-center text-gray-500">{tutor.email}</p>

                <p className="text-center mt-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    Tutor
                  </span>
                </p>

                <Link
                  to={`/courses?tutor=${tutor._id}`}
                  className="block text-center mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                  View Courses
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Tutors;

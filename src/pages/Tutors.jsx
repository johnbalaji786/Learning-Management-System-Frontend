import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Users, Search, GraduationCap, Star } from "lucide-react";

import Navbar from "../components/Navbar";
import { getAllTutors } from "../services/userServices";

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutors();
  }, []);

  useEffect(() => {
    const filtered = tutors.filter(
      (tutor) =>
        tutor.name.toLowerCase().includes(search.toLowerCase()) ||
        tutor.email.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredTutors(filtered);
  }, [search, tutors]);

  const fetchTutors = async () => {
    try {
      const data = await getAllTutors();

      setTutors(data.tutors);
      setFilteredTutors(data.tutors);
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
          {/* Hero */}

          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-3xl shadow-2xl p-10 text-white">
            <h1 className="text-4xl font-bold">Meet Our Expert Tutors</h1>

            <p className="mt-4 text-blue-100 text-lg max-w-3xl">
              Learn from experienced professionals and grow your skills with
              personalized guidance.
            </p>
          </div>

          {/* Statistics */}

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <Users size={38} className="text-blue-600 mb-3" />

              <p className="text-gray-500">Total Tutors</p>

              <h2 className="text-3xl font-bold mt-2">{tutors.length}</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <GraduationCap size={38} className="text-green-600 mb-3" />

              <p className="text-gray-500">Qualified Mentors</p>

              <h2 className="text-3xl font-bold mt-2">{tutors.length}</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <Star size={38} className="text-yellow-500 mb-3" />

              <p className="text-gray-500">Student Satisfaction</p>

              <h2 className="text-3xl font-bold mt-2">4.9★</h2>
            </div>
          </div>

          {/* Search */}

          <div className="bg-white rounded-2xl shadow-lg border p-5 mt-8 flex items-center gap-3">
            <Search className="text-gray-500" />

            <input
              type="text"
              placeholder="Search tutors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none"
            />
          </div>
          {/* Tutor Cards */}

          {filteredTutors.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl border p-16 text-center mt-8">
              <Users size={70} className="mx-auto text-gray-300 mb-6" />

              <h2 className="text-3xl font-bold text-gray-800">
                No Tutors Found
              </h2>

              <p className="text-gray-500 mt-3">
                Try searching with another keyword.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
              {filteredTutors.map((tutor) => (
                <div
                  key={tutor._id}
                  className="bg-white rounded-3xl shadow-lg border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                  {/* Header */}

                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-28"></div>

                  {/* Avatar */}

                  <div className="flex justify-center -mt-14">
                    <img
                      src={
                        tutor.profileImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          tutor.name,
                        )}&background=2563eb&color=fff&size=200`
                      }
                      alt={tutor.name}
                      className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  </div>

                  {/* Content */}

                  <div className="p-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {tutor.name}
                    </h2>

                    <p className="text-gray-500 mt-2 break-all">
                      {tutor.email}
                    </p>

                    <div className="flex justify-center mt-5">
                      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                        👨‍🏫 Professional Tutor
                      </span>
                    </div>

                    <div className="flex justify-center items-center gap-2 mt-5 text-yellow-500">
                      <Star size={18} fill="currentColor" />
                      <span className="font-semibold">4.9 Rating</span>
                    </div>

                    <Link
                      to={`/courses?tutor=${tutor._id}`}
                      className="block mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      View Courses
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Tutors;

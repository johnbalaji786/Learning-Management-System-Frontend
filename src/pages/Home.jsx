import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 via-white to-indigo-100">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left */}
              <div data-aos="fade-right">
                <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                  🎓 #1 Online Learning Platform
                </span>

                <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                  Learn From
                  <span className="text-blue-600"> Expert Tutors </span>
                  Anytime,
                  <span className="text-indigo-600"> Anywhere</span>
                </h1>

                <p className="mt-6 text-lg text-gray-600 leading-8">
                  Join thousands of students learning from experienced tutors.
                  Book live classes, improve your skills, and grow your career
                  with LearnHub.
                </p>

                <div className="flex gap-5 mt-10">
                  <Link
                    to="/courses"
                    className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-xl hover:scale-105 text-white px-8 py-4 rounded-xl font-semibold"
                  >
                    Explore Courses
                  </Link>

                  <Link
                    to="/register"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 px-8 py-4 rounded-xl font-semibold"
                  >
                    Get Started
                  </Link>
                </div>

                <div className="flex gap-10 mt-12">
                  <div>
                    <h2 className="text-3xl font-bold text-blue-600">500+</h2>
                    <p className="text-gray-500">Students</p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-blue-600">120+</h2>
                    <p className="text-gray-500">Tutors</p>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-blue-600">300+</h2>
                    <p className="text-gray-500">Courses</p>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div data-aos="zoom-in" className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
                  alt="Learning"
                  className="rounded-3xl shadow-2xl hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Features */}
        <section className="bg-gradient-to-b from-white to-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                Why Choose Us
              </span>
              ```
              <h2 className="text-5xl font-extrabold text-gray-900 mt-4">
                Why Choose <span className="text-blue-600">LearnHub?</span>
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                Learn smarter with experienced tutors, flexible schedules and an
                interactive learning experience.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-4xl group-hover:scale-110 transition">
                  🎓
                </div>

                <h3 className="text-2xl font-bold mt-6 text-gray-800">
                  Expert Tutors
                </h3>

                <p className="mt-3 text-gray-500 leading-7">
                  Learn from highly experienced and verified tutors with
                  excellent teaching skills and industry knowledge.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-4xl group-hover:scale-110 transition">
                  📅
                </div>

                <h3 className="text-2xl font-bold mt-6 text-gray-800">
                  Flexible Booking
                </h3>

                <p className="mt-3 text-gray-500 leading-7">
                  Schedule lessons whenever it suits you with an easy and
                  seamless booking experience.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-4xl group-hover:scale-110 transition">
                  💳
                </div>

                <h3 className="text-2xl font-bold mt-6 text-gray-800">
                  Secure Payments
                </h3>

                <p className="mt-3 text-gray-500 leading-7">
                  Safe online payments with a transparent booking system and
                  trusted transactions.
                </p>
              </div>
            </div>
            ```
          </div>
        </section>
        {/* Statistics */}
        <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:scale-105 transition duration-300">
                <div className="text-5xl mb-3">🎓</div>
                <h2 className="text-4xl font-bold text-white">500+</h2>
                <p className="text-blue-100 mt-2">Students</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:scale-105 transition duration-300">
                <div className="text-5xl mb-3">👨‍🏫</div>
                <h2 className="text-4xl font-bold text-white">120+</h2>
                <p className="text-blue-100 mt-2">Expert Tutors</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:scale-105 transition duration-300">
                <div className="text-5xl mb-3">📚</div>
                <h2 className="text-4xl font-bold text-white">300+</h2>
                <p className="text-blue-100 mt-2">Courses</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:scale-105 transition duration-300">
                <div className="text-5xl mb-3">⭐</div>
                <h2 className="text-4xl font-bold text-white">1000+</h2>
                <p className="text-blue-100 mt-2">Lessons Completed</p>
              </div>
            </div>
          </div>
        </section>
        {/* ================= CTA ================= */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 py-24">
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold text-white">
              Ready to Start Learning?
            </h2>

            <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
              Join thousands of students and learn from expert tutors through
              live classes, flexible scheduling, and interactive lessons.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-5">
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold shadow-lg hover:scale-105 hover:bg-gray-100 transition duration-300"
              >
                🚀 Join Now
              </Link>

              <Link
                to="/courses"
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition duration-300"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </section>
        ```jsx
        {/* Premium Footer */}
        <footer className="bg-gray-950 text-gray-300 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-10">
              {/* Brand */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">LearnHub</h2>

                <p className="text-gray-400 leading-7">
                  Learn from expert tutors, book live lessons, and achieve your
                  learning goals from anywhere.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Quick Links
                </h3>

                <ul className="space-y-3">
                  <li>
                    <Link to="/" className="hover:text-blue-400 transition">
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/courses"
                      className="hover:text-blue-400 transition"
                    >
                      Courses
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/tutors"
                      className="hover:text-blue-400 transition"
                    >
                      Tutors
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Support
                </h3>

                <ul className="space-y-3">
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Help Center
                    </a>
                  </li>

                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Contact Us
                    </a>
                  </li>

                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Contact
                </h3>

                <p className="mb-2">📧 support@learnhub.com</p>

                <p className="mb-2">📞 +91 98765 43210</p>

                <p>📍 Chennai, India</p>
              </div>
            </div>

            <hr className="border-gray-800 my-10" />

            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © 2026 LearnHub. All Rights Reserved.
              </p>

              <div className="flex gap-6 mt-4 md:mt-0 text-2xl">
                <a href="#" className="hover:scale-125 transition">
                  🌐
                </a>
                <a href="#" className="hover:scale-125 transition">
                  📘
                </a>
                <a href="#" className="hover:scale-125 transition">
                  📸
                </a>
                <a href="#" className="hover:scale-125 transition">
                  💼
                </a>
              </div>
            </div>
          </div>
        </footer>
        ```
      </div>
    </>
  );
};

export default Home;

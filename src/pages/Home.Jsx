import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Learn From the
                <span className="text-blue-600"> Best Tutors </span>
                Anytime, Anywhere
              </h1>

              <p className="mt-6 text-lg text-gray-600">
                Book online lessons, learn new skills, attend live sessions, and
                improve your knowledge with experienced tutors.
              </p>

              <div className="flex gap-4 mt-8">
                <Link
                  to="/courses"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Explore Courses
                </Link>

                <Link
                  to="/register"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold"
                >
                  Get Started
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                alt="Learning"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">
              Why Choose LearnHub?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-8 shadow">
                <div className="text-5xl mb-4">🎓</div>

                <h3 className="text-xl font-semibold mb-3">Expert Tutors</h3>

                <p className="text-gray-600">
                  Learn from experienced tutors with verified profiles and
                  excellent ratings.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 shadow">
                <div className="text-5xl mb-4">📅</div>

                <h3 className="text-xl font-semibold mb-3">Easy Scheduling</h3>

                <p className="text-gray-600">
                  Book lessons based on tutor availability with just a few
                  clicks.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 shadow">
                <div className="text-5xl mb-4">💳</div>

                <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>

                <p className="text-gray-600">
                  Pay securely and manage your lesson payments with ease.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <h2 className="text-5xl font-bold text-blue-600">500+</h2>
                <p className="mt-2 text-gray-600">Students</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold text-blue-600">120+</h2>
                <p className="mt-2 text-gray-600">Tutors</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold text-blue-600">300+</h2>
                <p className="mt-2 text-gray-600">Courses</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold text-blue-600">1000+</h2>
                <p className="mt-2 text-gray-600">Lessons Completed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="bg-blue-600 py-20">
          <div className="max-w-5xl mx-auto text-center px-6">
            <h2 className="text-4xl font-bold text-white">
              Start Your Learning Journey Today
            </h2>

            <p className="mt-4 text-blue-100 text-lg">
              Join thousands of students learning from professional tutors.
            </p>

            <Link
              to="/register"
              className="inline-block mt-8 bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100"
            >
              Join Now
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <h3 className="text-xl font-bold text-white">LearnHub</h3>

            <p className="mt-4 md:mt-0">
              © 2026 LearnHub. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;

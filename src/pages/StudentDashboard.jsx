import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";

const StudentDashboard = () => {
  const { user } = useLoaderData();

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>

        <p className="text-gray-500 mb-6">Student Dashboard</p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold">My Bookings</h2>

            <p className="text-2xl font-bold mt-2">0</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold">Payments</h2>

            <p className="text-2xl font-bold mt-2">0</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold">Reviews Given</h2>

            <p className="text-2xl font-bold mt-2">0</p>
          </div>
        </div>

        <Link
          to="/"
          className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default StudentDashboard;

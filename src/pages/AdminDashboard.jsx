import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h2>Total Users</h2>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2>Total Tutors</h2>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2>Total Courses</h2>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2>Total Bookings</h2>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
      </div>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default AdminDashboard;

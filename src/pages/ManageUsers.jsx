import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

import {
  getAllUsers,
  deleteUser,
  toggleUserStatus,
} from "../services/userServices";

import {
  Users,
  Shield,
  Mail,
  Trash2,
  Ban,
  CheckCircle2,
  Search,
} from "lucide-react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredUsers(filtered);
  }, [search, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getAllUsers();

      setUsers(response.users);
      setFilteredUsers(response.users);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      toast.success("User deleted successfully");

      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleStatus = async (id) => {
    try {
      await toggleUserStatus(id);

      toast.success("User status updated");

      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
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

  const activeUsers = users.filter((u) => u.isActive).length;
  const inactiveUsers = users.filter((u) => !u.isActive).length;
  const tutors = users.filter((u) => u.role === "tutor").length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}

          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-3xl p-10 text-white shadow-xl">
            <h1 className="text-4xl font-bold">User Management</h1>

            <p className="mt-3 text-blue-100 text-lg">
              Manage all students, tutors and administrators.
            </p>
          </div>

          {/* Statistics */}

          <div className="grid md:grid-cols-4 gap-6 mt-10">
            <div className="bg-white rounded-2xl shadow-lg p-6 border">
              <Users size={36} className="text-blue-600 mb-3" />

              <p className="text-gray-500">Total Users</p>

              <h2 className="text-3xl font-bold mt-2">{users.length}</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border">
              <CheckCircle2 size={36} className="text-green-600 mb-3" />

              <p className="text-gray-500">Active</p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {activeUsers}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border">
              <Ban size={36} className="text-red-600 mb-3" />

              <p className="text-gray-500">Blocked</p>

              <h2 className="text-3xl font-bold text-red-600 mt-2">
                {inactiveUsers}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border">
              <Shield size={36} className="text-purple-600 mb-3" />

              <p className="text-gray-500">Tutors</p>

              <h2 className="text-3xl font-bold text-purple-600 mt-2">
                {tutors}
              </h2>
            </div>
          </div>

          {/* Search */}

          <div className="bg-white rounded-2xl shadow-lg p-5 mt-8 flex items-center gap-4">
            <Search className="text-gray-500" />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* Table */}

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mt-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">User</th>

                    <th className="px-6 py-4 text-left">Email</th>

                    <th className="px-6 py-4 text-left">Role</th>

                    <th className="px-6 py-4 text-left">Status</th>

                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <h3 className="font-semibold">{user.name}</h3>

                            <p className="text-sm text-gray-500">
                              ID: {user._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Mail size={18} />

                          {user.email}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="capitalize font-semibold">
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            user.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.isActive ? "Active" : "Blocked"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleStatus(user._id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white transition ${
                              user.isActive
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                          >
                            {user.isActive ? (
                              <>
                                <Ban size={18} />
                                Block
                              </>
                            ) : (
                              <>
                                <CheckCircle2 size={18} />
                                Unblock
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleDelete(user._id)}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
                          >
                            <Trash2 size={18} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;

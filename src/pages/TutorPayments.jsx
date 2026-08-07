import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IndianRupee, CreditCard, User, Calendar } from "lucide-react";

import Navbar from "../components/Navbar";
import { getTutorPayments } from "../services/paymentServices";

const TutorPayments = () => {
  const [payments, setPayments] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const response = await getTutorPayments();

      setPayments(response.payments || []);
      setTotalEarnings(response.totalEarnings || 0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load earnings");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex justify-center items-center bg-slate-50">
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
          {/* Header */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">
            <h1 className="text-4xl font-bold">Tutor Earnings</h1>

            <p className="mt-3 text-blue-100 text-lg">
              View your payment history and earnings.
            </p>
          </div>

          {/* Cards */}

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border">
              <IndianRupee className="text-green-600 mb-4" size={40} />

              <p className="text-gray-500">Total Earnings</p>

              <h2 className="text-4xl font-bold text-green-600 mt-2">
                ₹{totalEarnings}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border">
              <CreditCard className="text-blue-600 mb-4" size={40} />

              <p className="text-gray-500">Total Payments</p>

              <h2 className="text-4xl font-bold text-blue-600 mt-2">
                {payments.length}
              </h2>
            </div>
          </div>

          {/* Payment Table */}

          <div className="bg-white rounded-3xl shadow-lg mt-10 overflow-hidden">
            <div className="px-8 py-6 border-b">
              <h2 className="text-2xl font-bold">Payment History</h2>
            </div>

            {payments.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                No Payments Yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Student</th>

                      <th className="px-6 py-4 text-left">Amount</th>

                      <th className="px-6 py-4 text-left">Date</th>

                      <th className="px-6 py-4 text-left">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {payments.map((payment) => (
                      <tr
                        key={payment._id}
                        className="border-b hover:bg-slate-50"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <User className="text-blue-600" size={18} />

                            {payment.student?.name}
                          </div>
                        </td>

                        <td className="px-6 py-5 font-bold text-green-600">
                          ₹{payment.amount}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-gray-500" />

                            {new Date(payment.paidAt).toLocaleDateString()}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorPayments;

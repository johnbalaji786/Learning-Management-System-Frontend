import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCourseReviews } from "../services/reviewServices";

const ReviewList = ({ courseId , refresh}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const data = await getCourseReviews(courseId);
      setReviews(data.reviews);
    } catch (error) {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [courseId, refresh]);

  if (loading) {
    return <div className="mt-8 text-center">Loading reviews...</div>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>

      {reviews.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-500">
          No reviews yet.
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white shadow rounded-xl p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">
                  {review.student?.name}
                </h3>

                <span className="text-yellow-500 font-bold">
                  {"⭐".repeat(review.rating)}
                </span>
              </div>

              <p className="text-gray-600">{review.comment}</p>

              <p className="text-xs text-gray-400 mt-3">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;

import { useState } from "react";
import { toast } from "react-toastify";
import { createReview } from "../services/reviewServices";

const ReviewForm = ({ courseId, refreshReviews }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReview(courseId, {
        rating,
        comment,
      });

      toast.success("Review added successfully");

      setComment("");
      setRating(5);

     if (refreshReviews) {
       refreshReviews();
     }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add review");
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Write a Review</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 rounded w-full mb-4"
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
          <option value={4}>⭐⭐⭐⭐ (4)</option>
          <option value={3}>⭐⭐⭐ (3)</option>
          <option value={2}>⭐⭐ (2)</option>
          <option value={1}>⭐ (1)</option>
        </select>

        <textarea
          rows="4"
          placeholder="Write your review..."
          className="border rounded w-full p-3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;

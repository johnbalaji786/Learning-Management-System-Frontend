import instance from "../instances/instance";
import protectedInstance from "../instances/protectedInstance";

// CREATE REVIEW
export const createReview = async (courseId, reviewData) => {
  const response = await protectedInstance.post(
    `/reviews/${courseId}`,
    reviewData,
  );

  return response.data;
};

// GET COURSE REVIEWS
export const getCourseReviews = async (courseId) => {
  const response = await instance.get(`/reviews/course/${courseId}`);

  return response.data;
};

// GET TUTOR REVIEWS
export const getTutorReviews = async (tutorId) => {
  const response = await instance.get(`/reviews/tutor/${tutorId}`);

  return response.data;
};

// DELETE REVIEW
export const deleteReview = async (reviewId) => {
  const response = await protectedInstance.delete(`/reviews/${reviewId}`);

  return response.data;
};

import instance from "../instances/instance";
import protectedInstance from "../instances/protectedInstance";

// GET ALL COURSES
export const getAllCourses = async (
  page = 1,
  limit = 10,
  search = "",
  subject = "",
  courseType = "",
  location = "",
) => {
  const response = await instance.get("/courses", {
    params: {
      page,
      limit,
      search,
      subject,
      courseType,
      location,
    },
  });

  return response.data;
};

// GET SINGLE COURSE
export const getCourseById = async (id) => {
  const response = await instance.get(`/courses/${id}`);
  return response.data;
};

// CREATE COURSE
export const createCourse = async (courseData) => {
  const response = await protectedInstance.post("/courses", courseData);
  return response.data;
};

// GET MY COURSES
export const getMyCourses = async () => {
  const response = await protectedInstance.get("/courses/my-courses");
  return response.data;
};

// UPDATE COURSE
export const updateCourse = async (id, courseData) => {
  const response = await protectedInstance.put(`/courses/${id}`, courseData);
  return response.data;
};

// DELETE COURSE
export const deleteCourse = async (id) => {
  const response = await protectedInstance.delete(`/courses/${id}`);
  return response.data;
};

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

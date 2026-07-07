import instance from "../instances/instance";
import protectedInstance from "../instances/protectedInstance";

export const getAllUsers = async () => {
  const response = await protectedInstance.get("/users");
  return response.data;
};
// GET ALL TUTORS
export const getAllTutors = async () => {
  const response = await instance.get("/users/tutors");
  return response.data;
};


export const deleteUser = async (id) => {
  const response = await protectedInstance.delete(`/users/${id}`);
  return response.data;
};

export const toggleUserStatus = async (id) => {
  const response = await protectedInstance.put(`/users/${id}/status`);
  return response.data;
};

export const getStudentDashboard = async () => {
  const response = await protectedInstance.get("/users/student-dashboard");
  return response.data;
};

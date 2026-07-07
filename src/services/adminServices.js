import protectedInstance from "../instances/protectedInstance";

export const getDashboardStats = async () => {
  const response = await protectedInstance.get("/admin/dashboard");

  return response.data;
};

export const getAllUsers = async () => {
  const response = await protectedInstance.get("/admin/users");
  return response.data;
};

export const toggleUserStatus = async (id) => {
  const response = await protectedInstance.put(`/admin/users/${id}`);
  return response.data;
};

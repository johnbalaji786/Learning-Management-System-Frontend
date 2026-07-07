import protectedInstance from "../instances/protectedInstance";

export const getTutorDashboard = async () => {
  const response = await protectedInstance.get("/tutor/dashboard");

  return response.data;
};

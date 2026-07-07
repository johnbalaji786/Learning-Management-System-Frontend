import protectedInstance from "../instances/protectedInstance";

export const makePayment = async (bookingId) => {
  const response = await protectedInstance.post(`/payments/${bookingId}/pay`);

  return response.data;
};

export const getMyPayments = async () => {
  const response = await protectedInstance.get("/payments/my-payments");

  return response.data;
};

export const getTutorPayments = async () => {
  const response = await protectedInstance.get("/payments/tutor-payments");

  return response.data;
};

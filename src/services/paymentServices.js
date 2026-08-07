import protectedInstance from "../instances/protectedInstance";

export const createOrder = async (bookingId) => {
  const response = await protectedInstance.post("/payments/create-order", {
    bookingId,
  });

  return response.data;
};

export const verifyPayment = async (bookingId) => {
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

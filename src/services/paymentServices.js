import instance from "./axiosInstance";

export const createOrder = async (bookingId) => {
  const response = await instance.post("/payments/create-order", {
    bookingId,
  });

  return response.data;
};

export const verifyPayment = async (bookingId) => {
  const response = await instance.post(`/payments/${bookingId}/pay`);

  return response.data;
};

export const getMyPayments = async () => {
  const response = await instance.get("/payments/my-payments");
  return response.data;
};

export const getTutorPayments = async () => {
  const response = await instance.get("/payments/tutor-payments");
  return response.data;
};

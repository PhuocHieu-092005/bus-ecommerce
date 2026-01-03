import axiosClient from "./axiosClient";

const bookingApi = {
  getAll: () => axiosClient.get("/bookings"),
  get: (id) => axiosClient.get(`/bookings/${id}`),
  getBookingUser: (userId) => axiosClient.get(`/myBookings/${userId}`),
  // Admin thường chỉ cập nhật trạng thái vé (Thanh toán/Hủy)
  update: (id, data) => axiosClient.put(`/bookings/${id}`, data),
  delete: (id) => axiosClient.delete(`/bookings/${id}`),
};

export default bookingApi;

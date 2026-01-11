import axiosClient from "./axiosClient";

const authApi = {
  login(data) {
    const url = "/login"; // Đường dẫn API login của server
    return axiosClient.post(url, data);
  },
  register(data) {
    return axiosClient.post("/register", data);
  },
  // --- SỬA DÒNG NÀY: Thêm tham số id ---
  changePassword(id, data) {
    return axiosClient.post(`/change-password`, data);
  },
  // -------------------------------------
  resetPassword(email) {
    return axiosClient.post("/reset-password", { email });
  },
};

export default authApi;

import axiosClient from "./axiosClient";

const authApi = {
  login(data) {
    return axiosClient.post("/login", data);
  },
  register(data) {
    return axiosClient.post("/register", data);
  },
  changePassword(data) {
    return axiosClient.post(`/change-password`, data);
  },
  // -------------------------------------
  resetPassword(email) {
    return axiosClient.post("/reset-password", { email });
  },
};

export default authApi;

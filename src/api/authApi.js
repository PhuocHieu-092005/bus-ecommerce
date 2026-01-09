import axiosClient from "./axiosClient";

const authApi = {
  login(data) {
    const url = "/login"; // Đường dẫn API login của server
    return axiosClient.post(url, data);
  },
  register(data) {
    const url = "/register";
    return axiosClient.post(url, data);
  },
  changePassword(data) {
    return axiosClient.post("/change-password", data);
  },
};

export default authApi;

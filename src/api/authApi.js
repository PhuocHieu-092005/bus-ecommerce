import axiosClient from "./axiosClient";

const authApi = {
  login(data) {
    const url = "/login"; // Đường dẫn API login của server (Tâm làm)
    return axiosClient.post(url, data);
  },
  register(data) {
    const url = "/register";
    return axiosClient.post(url, data);
  },
};

export default authApi;

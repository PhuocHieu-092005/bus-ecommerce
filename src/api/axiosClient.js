import axios from "axios";

const axiosClient = axios.create({
  // baseURL: " http://127.0.0.1:8000",
  // baseURL: "https://alec-vicegeral-exuberantly.ngrok-free.dev", public local
  baseURL: "https://hoaitam123.xyz", // host
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": "69420", // test với gork
  },
});

// Tự động thêm Token vào header nếu có
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Xử lý lỗi trả về
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
